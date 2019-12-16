import React, { useState } from "react";
import { axiosWithAuth } from "../axiosWithAuth";

const Login = props => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [creds, setCreds] = useState({ username:'', password: ''});

  const handleSubmit = event => {
    event.preventDefault();
    axiosWithAuth()
      .post("http://localhost:5000/api/login", creds)
      .then (res => {
        console.log("handleSubmit in Login.js res", res);
        localStorage.setItem('token', res.data.payload);
        props.history.push("/bubbles-page");
      })
      .catch(error => {
        console.log("handleSubmit in Login.js error", error);
      });
  }

  const handleChange = event => {
    event.preventDefault();
    setCreds({...creds, [event.target.name]: event.target.value})
  }


  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      {/* <p>Build a login page here</p> */}

      <div className="Login-Form">
        <form onSubmit={handleSubmit}>
          <input
          placeholder='username'
          value={creds.username}
          name="username"
          type="text"
          onChange={handleChange}
          />
          <input
          placeholder='password' 
          value={creds.password}
          name='password'
          type='password'
          onChange={handleChange}
          />
          <button type='submit'> Submit </button>
        </form>

      </div>
    </>
  );
};

export default Login;
