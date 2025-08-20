import { Link, useLocation } from "react-router-dom";

const BottomNavBar = () => {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 w-full bg-[#022213] py-4 min-h-[8dvh] flex justify-around items-center">
      <NavItem
        to="/home"
        label="Home"
        isActive={pathname.includes("/home")}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M12.707 2.293a1 1 0 0 0-1.414 0l-7 7l-2 2a1 1 0 1 0 1.414 1.414L4 12.414V19a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-6.586l.293.293a1 1 0 0 0 1.414-1.414z"
              clipRule="evenodd"
            />
          </svg>
        }
      />

      <NavItem
        to="/announcements"
        label="Alerts"
        isActive={pathname === "/announcements"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M2.53 14.394c-.213 1.353.738 2.292 1.902 2.76c4.463 1.795 10.673 1.795 15.136 0c1.164-.468 2.115-1.407 1.902-2.76c-.13-.832-.777-1.524-1.256-2.2c-.627-.897-.689-1.874-.69-2.915C19.525 5.26 16.157 2 12 2S4.475 5.26 4.475 9.28c0 1.04-.062 2.018-.69 2.914c-.478.676-1.124 1.368-1.255 2.2M9 21c.796.622 1.848 1 3 1s2.204-.378 3-1"
              color="currentColor"
            />
          </svg>
        }
      />

      <NavItem
        to="/chat"
        label="Chat"
        isActive={pathname === "/chat"}
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 21.25a9.25 9.25 0 1 0-8.307-5.177c.108.22.144.468.089.706l-.816 3.536a.6.6 0 0 0 .72.72l3.535-.817a1.06 1.06 0 0 1 .706.09A9.2 9.2 0 0 0 12 21.25M7.97 9.886h8.06m-8.06 4.228h5.748"
            />
          </svg>
        }
      />
    </div>
  );
};

// Reusable NavItem component
const NavItem = ({ to, label, icon, isActive }) => {
  return (
    <Link
      to={to}
      className={`text-white transition-all duration-300 ease-in-out w-24 h-16 flex flex-col justify-center items-center rounded-2xl ${
        isActive ? "bg-[#157f3d]" : "hover:bg-[#157f3d]/20"
      }`}
    >
      <div className="flex flex-col justify-center items-center">
        <div
          className="text-[#e2f4b7] transition-colors duration-300 ease-in-out"
          style={{ color: isActive ? "#fff" : "#e2f4b7" }}
        >
          {icon}
        </div>
        <h3
          className="transition-colors duration-300 ease-in-out text-sm mt-1"
          style={{ color: isActive ? "#fff" : "#e2f4b7" }}
        >
          {label}
        </h3>
      </div>
    </Link>
  );
};

export default BottomNavBar;
