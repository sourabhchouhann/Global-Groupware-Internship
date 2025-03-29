import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { updateUser } from "../utils/api";

const EditUserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });
  const [loading, setLoading] = useState(false); 

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUser(id, user);
      console.log("User updated successfully");
      navigate("/users");
    } catch (error) {
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Edit User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={user.first_name}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={user.last_name}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="block w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className={`w-full p-2 text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default EditUserPage;













// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { updateUser } from "../utils/api";

// const EditUserPage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

//   const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await updateUser(id, user);
//     console.log("User updated successfully");
//     navigate("/users");
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold">Edit User</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="first_name" placeholder="First Name" value={user.first_name} onChange={handleChange} className="block p-2 mb-2 border rounded"/>
//         <input type="text" name="last_name" placeholder="Last Name" value={user.last_name} onChange={handleChange} className="block p-2 mb-2 border rounded"/>
//         <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} className="block p-2 mb-2 border rounded"/>
//         <button className="bg-blue-500 text-white p-2 rounded">Save</button>
//       </form>
//     </div>
//   );
// };

// export default EditUserPage;
