import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth();
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
        <Link to="/applications">{isAdmin ? "All Applications" : "My Applications"}</Link>
        {!isAdmin && <Link to="/add">Apply</Link>}
      </div>
      <div className="nav-user">
        <span>
          Hi, {user.name} ({isAdmin ? user.company : "Student"})
        </span>
        <button className="btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}