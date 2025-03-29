import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaTimes } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";
import UserForm from "./UserForm";
import LogoutButton from "./LogoutButton";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://reqres.in/api/users?page=${pageNumber}`);
      setUsers(res.data.data);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleUpdateUser = (id, updatedUser) => {
    setActionLoading(id);
    axios
      .put(`https://reqres.in/api/users/${id}`, updatedUser)
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
        );
        setIsEditing(false);
      })
      .catch((err) => console.error("Error while updating user:", err))
      .finally(() => setActionLoading(null));
  };

  const handleDeleteUser = (id) => {
    setActionLoading(id);
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then(() => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((err) => console.error("Error deleting user:", err))
      .finally(() => setActionLoading(null));
  };

  // Below code for filter usens dynemicaly
  const filteredUsers = users.filter((user) =>
    (user.first_name + " " + user.last_name + " " + user.email)
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) && (filter === "" || user.first_name === filter)
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
        <div className="flex justify-between p-4">
        <h1 className="text-2xl font-bold">Users List</h1>
        <LogoutButton />
      </div>

      {/*  Search & Filter Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 shadow-md rounded-lg mb-6">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search users..."
            className="p-3 w-full pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-4 text-gray-400" />
          {searchTerm && (
            <FaTimes
              className="absolute right-3 top-4 text-gray-400 cursor-pointer"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>

        <select
          className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Users</option>
          {[...new Set(users.map((user) => user.first_name))].map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/*Loader */}
      {loading ? (
        <div className="text-center text-lg text-blue-500 animate-pulse">Loading users...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="p-6 bg-white shadow-lg rounded-lg transform hover:scale-105 transition duration-300"
              >
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="w-20 h-20 rounded-full mx-auto border-4 border-blue-300"
                />
                <h2 className="text-lg font-semibold text-center mt-3 text-gray-700">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-center text-gray-500">{user.email}</p>

                <div className="flex justify-center mt-4 gap-3">
                  <button
                    onClick={() => handleEdit(user)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600 transition"
                  >
                    <MdEdit size={18} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 hover:bg-red-600 transition"
                    disabled={actionLoading === user.id}
                  >
                    {actionLoading === user.id ? "Deleting..." : <MdDelete size={18} />}
                    {actionLoading === user.id ? "" : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-6 gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className={`px-5 py-2 rounded-lg transition ${
                page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Previous
            </button>

            <span className="text-lg font-semibold">{`Page ${page} of ${totalPages}`}</span>

            <button
              onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
              disabled={page === totalPages}
              className={`px-5 py-2 rounded-lg transition ${
                page === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {isEditing && (
        <UserForm
          user={selectedUser}
          onClose={() => setIsEditing(false)}
          onUpdate={handleUpdateUser}
        />
      )}
    </div>
  );
};

export default UsersList;


