import { useState } from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import SearchForm from "../SearchForm/SearchForm";

function Header({
  onSearchSubmit,
  handleSignInClick,
  isLoggedIn,
  currentUser,
  handleLogout,
  variant,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isSavedRoute = isLoggedIn && variant === "saved";
  const headerThemeClass = isSavedRoute
    ? "header_theme_light"
    : "header_theme_dark";

  return (
    <header
      className={`header ${headerThemeClass} ${isMenuOpen ? "header_opened" : ""}`}
    >
      <div className="header__menu">
        <span className="header__logo">NewsExplorer</span>

        <Navigation
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          handleLoginClick={handleSignInClick}
          handleLogout={handleLogout}
          variant={variant}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>

      {!isSavedRoute && (
        <section className="header__display">
          <h1 className="header__title">What's going on in the world?</h1>
          <p className="header__sub-title">
            Find the latest news on any topic and save them in your personal
            account.
          </p>
          <SearchForm onSearchSubmit={onSearchSubmit} />
        </section>
      )}
    </header>
  );
}

export default Header;
