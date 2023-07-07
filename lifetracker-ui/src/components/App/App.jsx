import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Registration from "../Registration/Registration";
import NutritionPage from "../NutritionPage/NutritionPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import Home from "../Home/Home";
import Login from "../Login/Login";
import ExercisePage from "../ExercisePage/ExercisePage";
import ExerciseForm from "../ExerciseForm/ExerciseForm";
import jwtDecode from "jwt-decode";

function App() {
  const [appState, setAppState] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          setAppState={setAppState}
          appState={appState}
          user={appState?.user}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth/register"
            element={<Registration setAppState={setAppState} />}
          />
          <Route
            path="/auth/login"
            element={<Login setAppState={setAppState} />}
          />
          <Route path="/activity" element={<ActivityPage />} />
          <Route
            path="/exercise/*"
            element={
              <ExercisePage
                user={appState?.user}
                setAppState={setAppState}
                appState={appState}
              />
            }
          >
            <Route
              path="create"
              element={
                <ExerciseForm
                  user={appState?.user}
                  setAppState={setAppState}
                  appState={appState}
                />
              }
            />
          </Route>

          <Route
            path="/nutrition"
            element={
              <NutritionPage
                setAppState={setAppState}
                appState={appState}
                user={appState?.user}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
