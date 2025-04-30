import LandingPage from "./pages/LandingPage";
import Authentication from "./pages/Authentication";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "@fontsource/plus-jakarta-sans";
import "@fontsource/roboto";
import { AuthProvider } from "./contexts/AuthContext";
import VideoMeetComponent from "./pages/videoMeet";
import HomeComponent from "./pages/home";
import History from "./pages/history";


function App() {
  return (
    <div className="app">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/auth" element={<Authentication />}>
              {" "}
            </Route>
            
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/history" element={<History />} />


            <Route path="/:url" element={<VideoMeetComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;


// TODO
// 1. Two users join two different meetings then chat feature doesn't work
// 2. Video on/off works for others but not for the user who turned it off/on
// Done 3. Senders name is not available if the messages are sent before a new user joins
// 4. User's name must be already there if he is logged in.