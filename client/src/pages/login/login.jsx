import React from 'react';
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from '../../firebase';
import Cookies from 'universal-cookie';

function Login() {

  const cookieHandler = new Cookies();

  const handleGoogleSignIn = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      cookieHandler.set('uid', res.user.uid, { path: '/' });
    }
    catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Login with Google</h2>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default Login;