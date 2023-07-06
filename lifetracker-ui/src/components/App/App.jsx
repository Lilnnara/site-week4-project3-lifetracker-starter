import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Registration from "../Registration/Registration";
import NutritionPage from "../NutritionPage/NutritionPage";
import ActivityPage from "../ActivityPage/ActivityPage";
import Home from "../Home/Home";
import Login from "../Login/Login";

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

// import "./App.css";
// import Navbar from "../Navbar/Navbar";
// import Login from "../Login/Login";
// import Registration from "../Registration/Registration";

// function App() {
//   return (
//     <div>
//       <Navbar />
//       <Login />
//       <Registration />
//     </div>
//   );
// }

// export default App;
