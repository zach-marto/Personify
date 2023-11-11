import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBQSHoRVe_bQzi9K-bRvlhqkL1uv9fCNrM',
  authDomain: 'personify-d333c.firebaseapp.com',
  projectId: 'personify-d333c',
  storageBucket: 'personify-d333c.appspot.com',
  messagingSenderId: '1022665084418',
  appId: '1:1022665084418:web:8186ebac2c43c91a26611b',
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
