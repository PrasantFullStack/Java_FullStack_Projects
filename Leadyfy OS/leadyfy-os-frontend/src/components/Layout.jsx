import { NavLink, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Clients", to: "/clients" },
  { label: "Orders", to: "/orders" },
  { label: "Scripts", to: "/scripts" },
  { label: "Creators", to: "/creators" },
  { label: "Shoots", to: "/shoots" },
  { label: "Videos", to: "/videos" },
  { label: "Portal", to: "/portal" },
];

function Layout() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg dark-navbar">
        <div className="container-fluid px-4">
          <span className="brand-mark">Leadyfy OS</span>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto align-items-center gap-2">
              {navItems.map((item) => (
                <li key={item.to} className="nav-item">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? "active" : ""}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li className="nav-item d-flex align-items-center gap-2 ms-3">
                <span className="user-pill">{user?.role || "ADMIN"}</span>
                <button className="btn btn-amber btn-sm" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container-fluid pb-5 pt-4 content-wrap">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
