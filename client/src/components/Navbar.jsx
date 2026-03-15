import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context.jsx/AuthContext";

function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="header-sketchy">
      <div className="brand-name">IdeasAnswer</div>
      <nav className="nav-tabs">
        <Link 
          to="/notes" 
          className={`nav-tab ${location.pathname === "/notes" ? "active" : ""}`}
        >
          Notes
        </Link>
        <Link 
          to="/chat" 
          className={`nav-tab ${location.pathname === "/chat" ? "active" : ""}`}
        >
          Chat
        </Link>
      </nav>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <button className="btn-sketchy" onClick={handleLogout} style={{ padding: "5px 15px", fontSize: "0.9rem" }}>
          Logout
        </button>
      </div>
    </header>
  );
}

export default Navbar;
