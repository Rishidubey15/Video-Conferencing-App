import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);
  
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  

  return (
    <>
      <div className="navBar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2 style={{cursor: "pointer"}} onClick={() => navigate("/")}>EchoMeet</h2>
        </div>

        <div className= "navBar-right"style={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              navigate("/history");
            }}
          >
            <RestoreIcon />
          </IconButton>
          <p style={{cursor: "pointer"}}>History</p>

          <Button
          style={{marginLeft: "10px"}}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="meetContainer">
        <div className="leftPanel">
          <h2>Providing Quality Video Call Just Like Quality Education</h2>

          <div style={{ display: "flex", gap: "10px" }}>
            <TextField
              onChange={(e) => setMeetingCode(e.target.value)}
              id="outlined-basic"
              label="Meeting Code"
              variant="outlined"
            />

            <Button className = "meetingCodeJoinButton"  onClick={handleJoinVideoCall} variant="contained">
              Join
            </Button>
          </div>
        </div>
        <div className="rightPanel">
          <img src="src/assets/img-for-home.webp" alt="" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
