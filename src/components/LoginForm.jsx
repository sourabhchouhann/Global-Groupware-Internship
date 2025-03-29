import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("https://reqres.in/api/login", { email, password });

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        navigate("/users");
      }
    } catch (err) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-purple-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm transform transition-all hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back! 👋</h2>
        <p className="text-center text-gray-500 mb-6">Login to continue</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="relative">
            <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 pt-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="relative">
            <label className="absolute left-3 top-2 text-gray-500 text-sm transition-all">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 pt-5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition-all duration-200"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Eye, EyeOff } from "lucide-react"; // Importing eye icons for password toggle

// const LoginForm = () => {
//   const [email, setEmail] = useState("eve.holt@reqres.in"); // ✅ Default email
//   const [password, setPassword] = useState("cityslicka"); // ✅ Default password
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const res = await axios.post("https://reqres.in/api/login", { email, password });

//       if (res.data.token) {
//         localStorage.setItem("authToken", res.data.token); // ✅ Store token in localStorage
//         navigate("/users"); // ✅ Redirect to the users list
//       }
//     } catch (err) {
//       setError("Invalid credentials");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back! 👋</h2>
//         <form onSubmit={handleLogin} className="space-y-4">
//           {/* Email Input */}
//           <div>
//             <label className="block text-gray-700 font-medium">Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//             />
//           </div>

//           {/* Password Input */}
//           <div>
//             <label className="block text-gray-700 font-medium">Password</label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Enter your password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition pr-10"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
//               >
//                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//               </button>
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             className={`w-full p-3 rounded-lg text-white font-medium transition ${
//               loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>

//           {/* Error Message */}
//           {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         </form>

//         {/* Additional Options */}
//         <div className="mt-4 text-center text-sm text-gray-600">
//           <p>
//             Don't have an account?{" "}
//             <a href="#" className="text-blue-500 hover:underline">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;



