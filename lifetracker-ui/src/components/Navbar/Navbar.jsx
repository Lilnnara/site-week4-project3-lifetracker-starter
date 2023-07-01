import "./Navbar.css";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="Navbar css-15bu2in">
      <div className="css-70qvj9">
        <a className="chakra-link css-14rj303" href="/">
          <img src="../src/assets/codepath.svg" alt="logo" />
        </a>
        <a className="chakra-link css-74uit1" href="/activity">
          Activity
        </a>
        <a className="chakra-link css-74uit1" href="/exercise">
          Exercise
        </a>
        <a className="chakra-link css-74uit1" href="/nutrition">
          Nutrition
        </a>
        <a className="chakra-link css-74uit1" href="/sleep">
          Sleep
        </a>
      </div>
      <div className="css-70qvj9">
        <a className="chakra-link css-spn4bz" href="/login">
          <button type="button" className="chakra-button css-1t9i4zo">
            Sign In
          </button>
        </a>
        <Link className="chakra-link css-spn4bz" to="/auth/register">
          <button type="button" className="chakra-button css-td8gbm">
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
