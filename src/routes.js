import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UsersPage from "./pages/UsersPage";
import EditUserPage from "./pages/EditUserPage";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/edit/:id" element={<EditUserPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
