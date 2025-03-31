import axios from "axios";
import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "@fontsource/plus-jakarta-sans";
import "@fontsource/roboto";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeetComponent from "./pages/videoMeet";

function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <Routes>
            {/* <Route path = "/home" element= {}></Route> */}
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/auth" element={<Authentication />}>
              {" "}
            </Route>

            <Route path='/:url' element={<VideoMeetComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
