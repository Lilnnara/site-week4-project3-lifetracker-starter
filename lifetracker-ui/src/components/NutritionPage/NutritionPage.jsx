import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NutritionPage({ appState, setAppState }) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = appState;

  const handleOnLogout = () => {
    setAppState({});
    navigate("/");
  };
  // THIS IS A TESTING PAGE TO SEE IF AUTHENTICATION WAS COMPLETE

  const title = isAuthenticated
    ? "You are logged in"
    : "Please login to the portal to see your appointment.";

  const content = isAuthenticated ? (
    <>
      <p className="location">We are currently working on this page!</p>
    </>
  ) : (
    <p className="appt">Thank you!</p>
  );

  const button = isAuthenticated ? (
    <button className="btn primary" onClick={handleOnLogout}>
      Logout
    </button>
  ) : (
    <Link to="/auth/login">
      <button className="btn primary">Login</button>
    </Link>
  );

  return (
    <div className="Portal">
      <div className="content">
        {isAuthenticated ? <h1>Welcome, {user.first_name}!</h1> : null}

        <div className="card">
          <div className="header">
            <div className={`title ${isAuthenticated ? "green" : ""}`}>
              {title}
            </div>
          </div>
          <div className="content">{content}</div>
          <div className="footer">{button}</div>
        </div>
      </div>

      <div className="media"></div>
    </div>
  );
}
