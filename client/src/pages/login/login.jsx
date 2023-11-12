import React from 'react';
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from '../../firebase';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import './login.css';

function Login() {

  const navigate = useNavigate();
  const cookieHandler = new Cookies();

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      cookieHandler.set('uid', res.user.uid, { path: '/' });
      navigate('/generateResume'); //Send the user to the generate resume page after successful login
      window.location.reload(false); //Refresh the page since App.js needs to update to see the uid cookie
    }
    catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <button class='login-with-google-btn' onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;