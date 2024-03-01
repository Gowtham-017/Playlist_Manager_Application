import React, { useEffect, useState} from 'react';
import '../styles/Signin.css';
import {Link} from "react-router-dom"
import { useHistory } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
const LoginPage = () => {
  //oauth
  const[user,setUser]=useState({});
  function handleCallbackResponse(response){
    console.log("JWT ID token: "+response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    const userData = {
      username: userObject.name,
      useremail: userObject.email,
      userpicture:userObject.picture,
    };
    document.getElementById('signInDiv').hidden = true;
    history.push({
      pathname: '/Sidebar',
      state: { userData } 
    });
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:"912529291014-1tduuoi6s7n4klocf280h2j844qs15lv.apps.googleusercontent.com",
      callback:handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme:"outline",size:"large"}
    );
    google.accounts.id.prompt();
  });
  //post login data
  const handleDatabase = async (userData) => {
    try {
      await postapi(userData);
    }catch (error) {
      console.error("Error posting data:", error);
    }
  };
  const postapi = async (userData) => {
    try {
      await axios.post('http://localhost:8082/api/v1/auth/send', userData);
      alert("Successfully Added the Data");
    }catch (error) {
        console.log(error.response.data);
        alert("Error occurred while adding data");
    }
  };
  //login with mail
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailerror, setEmailError] = useState('');
  const [apiError, setApiError] = useState('');
  const [passworderror, setPasswordError] = useState('');
  const history = useHistory();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleLogCred = (event) => {
    event.preventDefault();
    console.log('Login form submitted');
    console.log('Email:', email);
    console.log('Password:', password);
  };
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValid = true;
    // Email validation
    if (!email.trim()) {
      setEmailError('Please enter your email');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    }
    // Password validation
    if (!password.trim()) {
      setPasswordError('Please enter your password');
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError('Password should be at least 8 characters long');
      isValid = false;
    }
    if (isValid) {
      try {
        const response = await axios.post('http://localhost:8082/api/v1/auth/authenticate', {
          email: email,
          password: password
        });
        console.log(response.data);
        localStorage.setItem('token', response.data.token);
        console.log(localStorage.getItem('token'));
        alert("Login Successful.");
        history.push('./Sidebar');
      } catch (error) {
        console.error('Error:', error);     
        setApiError('*Invalid email or password');
      }
    }
  };
return (
  <div className="login-page">
          <div className="login1-page">
            <div className="login-container">
            <div>   
          </div>
              <h2>Sign In</h2>
              <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required/>
                <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required/>
                <br /><br />
                <button type="submit"  onClick={"handleLoggin"} className='signinbutton'>Log In</button>
                <h4>____________ Or ____________</h4>
              <center> <div  onClick={handleDatabase} id='signInDiv' ></div> </center>
              </form><br />
              <h4 className='newuser'>New User?</h4>
              <button type="button" className='signinbutton'><Link to="signup">Create new Account</Link></button></div>  
            </div>
          <div>
        </div>
    </div>
  );
};
export default LoginPage;