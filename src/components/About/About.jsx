import "./About.css";
import aboutImage from "../../assets/author__avatar.png";

function About() {
  return (
    <section className="about-author__section">
      <div className="about-author">
        <img
          className="about-author__avatar"
          src={aboutImage}
          alt="Author's photo"
        />
        <div className="about-author__content">
          <h2 className="about-author__title">About the author</h2>
          <p className="about-author__text">
            I'm Anthony Davenport, a dedicated MERN stack Developer and
            TripleTen graduate. I specialize in building responsive, efficient
            web applications using JavaScript, React, Node.js, Express, and
            MongoDB, transforming complex ideas into clean, functional code.
          </p>
          <p className="about-author__text">
            By combining this rigorous technical training with my Bachelor of
            Business Administration (BBA) in International Business Management
            from Eastern Michigan University, I bring a unique blend of clean
            engineering and strategic business perspective to help potential
            clients scale their platforms and maximize their impact.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
