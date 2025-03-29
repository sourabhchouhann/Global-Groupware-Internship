import { useNavigate } from "react-router-dom";

const UserCard = ({ user, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div className="border p-4 flex items-center space-x-4 rounded shadow">
      <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full" />
      <div>
        <p className="font-bold">{user.first_name} {user.last_name}</p>
        <button onClick={() => navigate(`/edit/${user.id}`)} className="text-blue-500 mr-2">Edit</button>
        <button onClick={() => onDelete(user.id)} className="text-red-500">Delete</button>
      </div>
    </div>
  );
};

export default UserCard;
