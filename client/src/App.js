
import './App.css';
import { Routes, Route,Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import SignupLogin from "./pages/SignupLogin";
import Donation from './pages/Donation';
import Success from './pages/success';
import PostHerePage from './pages/PostHerePage';
import Alert from './pages/Alert';
import VolunteerDashboard from "./components/Dashboard/VolunteerDashboard";

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/About" element={<About/>} />
        <Route path="/register" element={<SignupLogin/>} />
        <Route path="/login" element={<SignupLogin/>} />
        <Route path="/donate" element={<Donation/>} />
        <Route path="/donate/success" element={<Success/>} />
        <Route path="/post" element={<PostHerePage/>} />
        <Route path="/data" element={<Alert/>} />
        <Route path="/volunteerdashboard" element={<VolunteerDashboard />} />
      </Routes>
    </>
  );
}



export default App;
