
import './App.css';
import { Routes, Route,Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import SignupLogin from "./pages/SignupLogin";
import DonationList from './pages/DonationList';
import DonationForm from './pages/DonationForm';
import Success from './pages/success';
import PostHerePage from './pages/PostHerePage';
import Alert from './pages/Alert';
import VolunteerDashboard from "./components/Dashboard/VolunteerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/About" element={<About/>} />
        <Route path="/register" element={<SignupLogin/>} />
        <Route path="/login" element={<SignupLogin/>} />
        <Route path="/donation" element={<DonationList/>} />
        <Route path="/donate/:orgId" element={<DonationForm />} />
        <Route path="/post" element={<PostHerePage/>} />
        <Route path="/data" element={<Alert/>} />
        <Route path="/volunteerdashboard" element={ <ProtectedRoute allowedRoles={["volunteer"]}>
              <VolunteerDashboard />
            </ProtectedRoute>} />
      </Routes>
    </>
  );
}



export default App;
