import './App.css';
import Login from './pages/login/login.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GenerateResume from './pages/generateResume/generateResume.jsx';
import Cookies from 'universal-cookie';
import EditProfile from './pages/profile/EditProfile.jsx';
import uid from './cookieHandler';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={uid ? <Navigate to="/generateResume" /> : <Login />} />
          <Route path="/generateResume" element={uid ? <GenerateResume /> : <Navigate to="/" />} />
          <Route path="/editProfile" element={uid ? <EditProfile /> : <Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
