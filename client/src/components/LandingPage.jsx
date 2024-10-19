import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/LandingPage.css"


const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Welcome to Reside Inn PG</h1>
      <p>Your home away from home.</p>
      <Link to="/login" >Go to Login Page</Link>
    </div>
  );
};

export default LandingPage;
