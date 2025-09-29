import { Link, useNavigate, useLocation } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

import { sidebarLinks } from "../../constants/dashboardLinks";
import Button from "../../ui/Button";
import { login } from "../../constants/path";
import { getRole } from "../../utils/functions";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  let userRole: string | null = null;

  if (token) {
    try {
      userRole = getRole();
    } catch (err) {
      console.error("Invalid token:", err);
      userRole = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate(login);
  };

  return (
    <>
      <div>
        <h2 className="text-xl font-bold mb-6 text-[var(--primary)]">
          Dashboard
        </h2>
        <ul className="space-y-4">
          {sidebarLinks
            .filter((link) => link.accessTo.includes(userRole || ""))
            .map(({ icon: Icon, text, link }) => (
              <li key={text}>
                <Link
                  to={link}
                  className={`flex items-center space-x-3 p-2 rounded-md transition 
                    ${
                      location.pathname === link
                        ? "bg-[var(--primary)] text-white"
                        : "text-[var(--text-primary)] hover:text-[var(--primary)]"
                    }`}
                >
                  <Icon size={20} />
                  <span>{text}</span>
                </Link>
              </li>
            ))}
        </ul>
      </div>

      <div>
        <Button
          variant="ghost"
          onClick={handleLogout}
          className="flex items-center space-x-3 text-[var(--text-primary)] hover:text-[var(--primary)] transition w-full p-2 rounded-md"
        >
          <AiOutlineLogout size={20} />
          <span>Logout</span>
        </Button>
      </div>
    </>
  );
};

export default SideBar;
