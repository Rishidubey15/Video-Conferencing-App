
import React from 'react'
import '../App.css'
import { Button, Link } from "@mui/material";


export default function LandingPage() {
  return (
    <>
      <div className="landingPageContainer">
        <nav className="navbar">
          <div className="navLeftPart">
            <h2>EchoMeet</h2>
          </div>
          <div className="navRightPart">
            <p className='navRightPart-element'>Join as guest</p>
            <p className='navRightPart-element'>Register</p>
            <button className='navRightPart-element btn'>Login</button>
          </div>
        </nav>

        <div className="mainPage">
          <div className="leftMainPage">
            <h2 className='leftMainPage-heading'><span style={{color: "orange"}}>Connect</span> with your Loved Ones</h2>
            <p className='leftMainPage-subHeading'>Cover a distance by EchoMeet</p>
            <button className='leftMainPage-btn'><Link to={"/auth"}>Get Started</Link></button>
          </div>
          <div className="rightMainPage">
            <img src="src\assets\Main-page-video-call.png" alt="image loading.." />
          </div>
        </div>
      </div>
    </>
  )
}
