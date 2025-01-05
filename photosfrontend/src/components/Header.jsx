import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logout from "./Logout";
import { AuthContext } from "./AuthProvider";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <header className="header">
      <nav>
        <ul className="nav-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          {user && (
            <li>
              <Link to="/albums">My Albums</Link>
            </li>
          )}
          {!user && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {user && (
            <div className="logout-container">
              <Logout />
            </div>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
