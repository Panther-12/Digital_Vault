import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Documentation from './pages/Documentation';
import Dashboard from './pages/Dashboard';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Homepage/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/register" element={<RegistrationForm/>} />
          <Route path="/login" element={<LoginForm/>} />
          <Route path="/documentation" element={<Documentation/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
