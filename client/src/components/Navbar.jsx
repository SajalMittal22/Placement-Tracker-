import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <strong>Placement Tracker</strong>
        <Link to="/">Dashboard</Link>
        <Link to="/applications">Applications</Link>
        <Link to="/add">Add Application</Link>
      </div>
      <div className="nav-user">
        <span>Hi, {user.name}</span>
        <button className="btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}