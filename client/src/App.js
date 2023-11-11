import './App.css';
import Login from './pages/login/login.jsx';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import GenerateResume from './pages/generateResume/generateResume.jsx';
import Cookies from 'universal-cookie';



function App() {

  const cookieHandler = new Cookies();

  const uid = cookieHandler.get('uid')

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/generateResume" element={<GenerateResume />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
