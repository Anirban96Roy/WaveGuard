import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom"; 
import '../customCSS/login.css';
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); 
  const [active, setActive] = useState(false);  
  const [username, setUsername] = useState(''); 
  const [contact, setContact] = useState('');   
  const [email, setEmail] = useState('');       
  const [password, setPassword] = useState(''); 
  const [location, setLocation] = useState(''); 
  const navigate = useNavigate();
  const loc = useLocation();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState('');    

  useEffect(() => {
    const roleFromURL = searchParams.get("role");
    if (roleFromURL) {
      setRole(roleFromURL);
    }
  }, [searchParams]);

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setActive(!active);  
    if (isLogin) {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const values = {
      name: !isLogin ? username : "",
      contact: !isLogin ? contact : "",
      email: email,                   
      password: password,             
      location: !isLogin ? location : "",
      role: !isLogin ? role : "",     
    };

    try {
      setLoading(true);
      const endpoint = isLogin ? "users/login" : "users/register";
      const { data } = await axios.post(endpoint, values);

      setLoading(false);
      
      if (isLogin) {
        // Save user to localStorage
        localStorage.setItem("user", JSON.stringify({ ...data.user, token: data.token, password: "" }));

        // Redirect to dashboard based on role
        const userRole = data.user.role; 
        if (userRole === "volunteer") {
          navigate("/volunteerdashboard"); 
        } else if (userRole === "victim") {
          navigate("/victimdashboard");
        }
      } else {
        toggleForm(); 
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "volunteer") {
        navigate("/volunteerdashboard");
      } else if (user.role === "victim") {
        navigate("/victimdashboard");
      }
    }
  }, [navigate]);

  useEffect(() => {
    if (loc.pathname === "/register") {
      setIsLogin(false);
      setActive(true);
    } else if (loc.pathname === "/login") {
      setIsLogin(true);
      setActive(false);
    }
  }, [loc.pathname]);

  return (
    <div className={`container ${active ? 'active' : ''}`}>
      <div className="curved-shape"></div>
      <div className="curved-shape2"></div>

      {isLogin ? (
        <div className="form Login">
          <h2>Login</h2>
          <form onSubmit={submitHandler}>
            <div className="input-box">
              <input 
                type="text" 
                id="Email" 
                className="input" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <label htmlFor="Email" className="label">Email</label>
            </div>
            <div className="input-box">
              <input 
                type="password" 
                id="Password" 
                className="input" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <label htmlFor="Password" className="label">Password</label>
            </div>
            <div className="input-box">
              <button className="button" type="submit">Login</button>
            </div>
            <div className="reg-link">
              <p>
                Don't have an account? 
                <a href="/register" onClick={(e) => { e.preventDefault(); toggleForm(); }} className="SignUpLink"> SignUp</a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="form Register">
          <h2>Register</h2>
          <form onSubmit={submitHandler}>
            <div className="input-box">
              <input 
                type="text" 
                id="Username" 
                className="input" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
              />
              <label htmlFor="Username" className="label">Username</label>
            </div>
            <div className="input-box">
              <input 
                type="text" 
                id="Contact" 
                className="input" 
                required 
                value={contact} 
                onChange={(e) => setContact(e.target.value)} 
              />
              <label htmlFor="Contact" className="label">Contact</label>
            </div>
            <div className="input-box">
              <input 
                type="text" 
                id="Email" 
                className="input" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <label htmlFor="Email" className="label">Email</label>
            </div>
            <div className="input-box">
              <input 
                type="password" 
                id="Password" 
                className="input" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <label htmlFor="Password" className="label">Password</label>
            </div>
            <div className="input-box">
              <input 
                type="text" 
                id="Location" 
                className="input" 
                required 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
              />
              <label htmlFor="Location" className="label">Location</label>
            </div>
            <div className="input-box">
              <button className="button" type="submit">Register</button>
            </div>
          </form>
        </div>
      )}

      <div className={`info-content ${isLogin ? 'Login' : 'Register'}`}>
        <h2>Welcome!</h2>
        <p>We are here to help!<br />Stay connected with us!!</p>
      </div>
    </div>
  );
};

export default Login;
