import React, { useEffect } from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const auth = localStorage.getItem('user');
      if (auth)
        navigate('/');
    });
    


    const sumit=async()=>{
     
      let result = await fetch("http://localhost:5000/login", {
        method: "post",
        body: JSON.stringify({email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      result=await result.json();
      console.log(JSON.stringify(result));
       if(result.auth)
       {
        localStorage.setItem("user",JSON.stringify(result.user));
        localStorage.setItem("token",JSON.stringify(result.auth));
        navigate("/");
       }
       else
       alert("Please check email and password")
    }
  return (
    <div className="form">
      <h1>Login</h1>
    <input
      className="box"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter the Email"
    />
   
    <input
      className="box"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter the Password"
    />
    <button className="button" onClick={sumit} type="button">
      SignUp
    </button></div>
  )
}

export default Login