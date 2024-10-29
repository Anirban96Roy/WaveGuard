
import './App.css';
import { Routes, Route,Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import SignupLogin from "./pages/SignupLogin";

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/About" element={<About/>} />
        <Route path="/register" element={<SignupLogin/>} />
        <Route path="/login" element={<SignupLogin/>} />
      </Routes>
    </>
  );
}



export default App;
