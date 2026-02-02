import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

type Menu = {
  label: string;
  path: string;
};

type Props = {
  title: string;
  menus: Menu[];
};

export default function Sidebar({ title, menus }: Props) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white shadow-lg p-5 min-h-screen">
      <h2 className="text-xl font-bold mb-6">{title}</h2>

      <nav className="space-y-2">
        {menus.map((menu, i) => (
          <NavLink
            key={i}
            to={menu.path}
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-blue-100 font-semibold" : "hover:bg-gray-100"
              }`
            }
          >
            {menu.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-2 mt-10 text-red-500"
      >
        <LogOut size={18} /> Logout
      </button>
    </aside>
  );
}
