
import './App.css';
import { Routes, Route,Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/About" element={<About/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}



export default App;
