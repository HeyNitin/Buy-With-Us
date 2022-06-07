import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="social">
        <a href="https://github.com/heynitin/Buy-With-Us" target="_blank">
          <FontAwesomeIcon icon={faGithub} className="fa" />
        </a>
        <a href="https://twitter.com/07_Nitin_07" target="_blank">
          <FontAwesomeIcon icon={faTwitter} className="fa" />
        </a>
        <a href="https://www.linkedin.com/in/heynitin/" target="_blank">
          <FontAwesomeIcon icon={faLinkedin} className="fa" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
