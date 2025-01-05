import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Logout.css";
function Logout() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      console.log("Session invalidated on server");

      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        await fetch("https://oauth2.googleapis.com/revoke", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: `token=${accessToken}`,
        });

        console.log("Access token revoked");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("idToken");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
      Logout
    </button>
  );
}

export default Logout;
