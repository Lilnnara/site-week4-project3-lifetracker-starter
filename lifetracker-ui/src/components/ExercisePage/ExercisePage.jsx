import "./ExercisePage.css";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import bikepathImg from "../../assets/bikepath.jpg";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import ExerciseCard from "../ExerciseCard/ExerciseCard";
import axios from "axios";

export default function ExercisePage({ user, setAppState, appState }) {
  const [exercises, setExercises] = useState([]);
  const { isAuthenticated } = appState;

  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleAddExercise = () => {
    setShowForm(true); // Set showForm to true to display the form
  };
  useEffect(() => {
    if (location.pathname === "/exercise") {
      setShowForm(false);
    } else if (location.pathname === "/exercise/create") {
      setShowForm(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/auth/exercise/${user.id}`,

          {
            params: { user_id: user.user_id },
          }
        );
        setExercises(res.data.exercises);
      } catch (err) {
        console.error("Failed to fetch exercises", err);
      }
    };
    fetchExercises();
  }, []);

  const content = isAuthenticated ? (
    <div className="ExercisePage css-1bpnzr3">
      <div className="css-19cns6y">
        <div className="chakra-stack css-1cgbrw5">
          <h2 className="chakra-heading css-b5coes">Exercise</h2>
        </div>
      </div>
      <div className="css-vpbd2d">
        <div className="css-1qfrez2">
          <div className="css-uiodal">
            <div className="exercise-feed">
              <div className="css-0">
                {!showForm && (
                  <div className="css-j7qwjs">
                    <h2 className="chakra-heading css-hzsul0">
                      Nothing here yet.
                    </h2>
                    <Link
                      to="/exercise/create"
                      className="chakra-link button css-spn4bz"
                    >
                      <button
                        type="button"
                        className="chakra-button css-ez23ye"
                        onClick={handleAddExercise}
                      >
                        Add Exercise
                      </button>
                    </Link>
                    <div>
                      {[...exercises].reverse().map((exercise) => (
                        <ExerciseCard key={exercise.id} exercise={exercise} />
                      ))}
                    </div>

                    <img
                      src={bikepathImg}
                      className="chakra-image css-ni3ua3"
                    />
                  </div>
                )}
                {showForm && (
                  <ExerciseForm
                    user={user}
                    setAppState={setAppState}
                    setShowForm={setShowForm}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="chakra-container css-1m340o4">
      <h2 className="chakra-heading css-1dklj6k">Log in to see your data.</h2>
    </div>
  );
  return <div>{content}</div>;
}
