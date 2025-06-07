import { getProfile, logout } from "../auth";
import { useNavigate, Link } from "react-router-dom";

function Toolbar() {
  const profile = getProfile();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!profile) return null;

  return (
    <div className="toolbar">
      <div className="container toolbar-content">
        <Link 
          to="/news" 
          className="logo"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          News App
        </Link>
        <div className="profile">
          <div className="profile-info">
            <img src={profile.avatar} alt="avatar" className="avatar" />
            <span className="profile-name">{profile.name}</span>
          </div>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
