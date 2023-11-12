import React from 'react';
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from '../../firebase';
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import './login.css';
import Topbar from '../../components/topbar';

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
      <Topbar />
      <div className="loginDiv">
        <h1>Welcome to Personify!</h1>
        <p>Sign in with your Google account to get started.</p>
        <button class='login-with-google-btn' onClick={handleGoogleSignIn}>Sign in with Google</button>
      </div>
    </div>
  );
};

export default Login;