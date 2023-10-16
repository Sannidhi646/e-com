import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    const auth=localStorage.getItem("user");
    if(auth)
    {
      navigate("/");
    }
    
  })

  const sumit = async () => {
    console.log(name, email, password);
    let result = await fetch("http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    localStorage.setItem("user",JSON.stringify(result.result));
    localStorage.setItem("token",JSON.stringify(result.auth));
    console.warn(result);
    if (result) {
      navigate("/");
    }
  };

  return (
    <div className="form">
      <h1>Register</h1>
      <label>Name</label>
      <input
        className="box"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <label>Email</label>
      <input
        className="box"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <label>Password</label>
      <input
        className="box"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="button" onClick={sumit} type="button">
        SignUp
      </button>
    </div>
  );
};

export default Signup;
