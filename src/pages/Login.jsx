import React from 'react'
import Template from "../components/core/Auth/Template";
import login from "../assets/login4.jpg";

function Login({ setIsLoggedIn }) {
  return (
   <Template
      title="Welcome back"
      desc1="Build skills for today,tomorrow and beyond"
      desc2="Education to future-proof your carrer"
      image={login}
      formtype="login"
      setIsLoggedIn={setIsLoggedIn}

   />
  );
}

export default Login;
