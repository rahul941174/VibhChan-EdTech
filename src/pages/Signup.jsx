import React from 'react'
import Template from "../components/core/Auth/Template";
import signupImg from "../assets/signup.jpg";

function Signup({ setIsLoggedIn }) {
  return (
    <Template
      title="Join the millions learning to code wit Vibhchan for free"
      desc1="Build skills for today,tomorrow and beyond"
      desc2="Education to future-proof your carrer"
      image={signupImg}
      formtype="signup"
      setIsLoggedIn={setIsLoggedIn}

   />
  );
}

export default Signup;
