import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ user, setAppState }) {
  const navigate = useNavigate();
  const isAuthenticated = Boolean(user?.email);

  const handleOnLogout = () => {
    localStorage.setItem("lifetracker_token", null);
    setAppState({});
    navigate("/");
  };

  const button = isAuthenticated ? (
    <button
      type="button"
      className="chakra-button css-1t9i4zo"
      onClick={handleOnLogout}
    >
      Sign Out
    </button>
  ) : (
    <Link to="/auth/login" className="chakra-link css-spn4bz">
      <button type="button" className="chakra-button css-1t9i4zo">
        Sign In
      </button>
    </Link>
  );

  return (
    <div className="Navbar css-15bu2in">
      <div className="css-70qvj9">
        <Link className="chakra-link css-14rj303" to="/">
          <img src="../src/assets/codepath.svg" alt="logo" />
        </Link>
        <Link className="chakra-link css-74uit1" to="/activity">
          Activity
        </Link>
        <Link className="chakra-link css-74uit1" to="/exercise">
          Exercise
        </Link>
        <Link className="chakra-link css-74uit1" to="/nutrition">
          Nutrition
        </Link>
        <Link className="chakra-link css-74uit1" to="/sleep">
          Sleep
        </Link>
      </div>
      <div className="css-70qvj9">
        {button}
        {!isAuthenticated && (
          <Link className="chakra-link css-spn4bz" to="/auth/register">
            <button type="button" className="chakra-button css-td8gbm">
              Register
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
