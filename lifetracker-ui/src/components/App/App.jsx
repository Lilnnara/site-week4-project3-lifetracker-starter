import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Registration from "../Registration/Registration";
import NutritionPage from "../NutritionPage/NutritionPage";

function App() {
  const [appState, setAppState] = useState({});

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/auth/register"
            element={<Registration setAppState={setAppState} />}
          />
          {/* add other routes here */}
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
