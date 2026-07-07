import { Link, NavLink } from "react-router-dom";
import "./Footer.css";
import gitHubIcon from "../../assets/github.svg";
import linkedInIcon from "../../assets/linkedIn.svg";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__info">©2026 Supersite, Powered by News API</p>
      <span className="footer__menu_panel">
        <div className="footer__link-group">
          <NavLink to="/">
            <button className="footer_home_link">Home</button>
          </NavLink>
          <a
            className="footer_TripleTen_link"
            href="https://www.tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="footer_TripleTen_link">TripleTen</button>
          </a>
        </div>
        <div className="footer__button-group">
          <a
            href="https://www.github.com/t-davenport404"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={gitHubIcon}
              alt="Github Icon"
              className="footer_GitHub_link"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/anthony-davenport-usa"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={linkedInIcon}
              alt="LinkedIn Icon"
              className="footer_LinkedIn_link"
            />
          </a>
        </div>
      </span>
    </footer>
  );
}

export default Footer;
