import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation({
  isLoggedIn,
  currentUser,
  handleLoginClick,
  handleLogout,
  variant,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const displayUsername = currentUser?.name || "User";
  const theme = variant === "saved" ? "light" : "dark";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navigation navigation_theme_${theme}`}>
      <button
        className={`navigation__hamburger ${isMenuOpen ? "navigation__hamburger_close" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle navigation"
      ></button>

      <div
        className={`navigation__button-cluster ${isMenuOpen ? "navigation__button-cluster_visible" : ""}`}
      >
        <NavLink
          to="/"
          className={({ isActive }) =>
            `navigation__link ${isActive ? "navigation__link_active navigation__link_home" : ""}`
          }
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </NavLink>

        {isLoggedIn && (
          <NavLink
            to="/saved-news"
            className={({ isActive }) =>
              `navigation__link ${isActive ? "navigation__link_active navigation__link_saved" : ""}`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Saved articles
          </NavLink>
        )}

        {isLoggedIn ? (
          <button
            onClick={() => {
              handleLogout();
              setIsMenuOpen(false);
            }}
            type="button"
            className="navigation__button-logout"
          >
            {displayUsername}
            <span className="navigation__logout-icon"></span>
          </button>
        ) : (
          <button
            onClick={() => {
              handleLoginClick();
              setIsMenuOpen(false);
            }}
            type="button"
            className="navigation__button-signin"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
