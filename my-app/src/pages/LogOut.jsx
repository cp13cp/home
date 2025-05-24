import { useNavigate } from "react-router-dom";

export default function LogoutButton({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
    setIsLoggedIn(false); // 🔥 Ye sabse important hai
    navigate("/"); // Ya login page pe bhi bhej sakte ho
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-500 hover:text-red-700 font-medium"
    >
      Logout
    </button>
  );
}
