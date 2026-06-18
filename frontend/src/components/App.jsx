import { Link, useNavigate, NavLink} from 'react-router-dom';
import { clearToken } from '../api';

const AppBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <div className="bg-[#606676] text-white p-4 shadow-lg">
  <div className="max-w-7xl mx-auto flex justify-between items-center">

    <NavLink
      to="/"
      className={({ isActive }) =>
        `text-xl font-semibold font-poppins ${
          isActive ? "underline underline-offset-8" : ""
        }`
      }
    >
      Home
    </NavLink>

    <NavLink
      className={({ isActive }) =>
        `text-xl font-semibold font-poppins ${
          isActive ? "underline underline-offset-8" : ""
        }`
      }
    >
      Hall Details
    </NavLink>

    <NavLink
      to="/add"
      className={({ isActive }) =>
        `text-xl font-semibold font-poppins ${
          isActive ? "underline underline-offset-8" : ""
        }`
      }
    >
      Add Details
    </NavLink>

    <button
      type="button"
      onClick={handleLogout}
      className="text-xl font-semibold font-poppins"
    >
      Logout
    </button>

  </div>
</div>
  );
};

export default AppBar;
