import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom"; 
import '../customCSS/login.css'; // Importing the CSS module
import axios from "axios";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);  // Controls whether we're on Login or Register form
  const [active, setActive] = useState(false);  // Controls the 'active' class on container
  const [username, setUsername] = useState(''); // Username for registration
  const [email, setEmail] = useState('');       // Email for login or registration
  const [password, setPassword] = useState(''); // Password for login or registration
  const navigate = useNavigate();
  const location = useLocation(); // Get the current URL

  // Toggle between Login and Register forms and set 'active' class
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setActive(!active);  // Toggle the 'active' class

    // Update the URL based on whether it's login or register
    if (isLogin) {
      navigate('/register');
    } else {
      navigate('/login');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    
    // Create a values object based on form type
    const values = {
      name: !isLogin ? username : "", // Use username for registration
      email: email,                   // Email for login or registration
      password: password,             // Password for login or registration
    };

    try {
      setLoading(true);
      const endpoint = isLogin ? "users/login" : "users/register";
      const { data } = await axios.post(endpoint, values);

      setLoading(false);
      
      if (isLogin) {
        localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
        navigate("/");
      } else {
        toggleForm();  // Switch to login after successful registration
      }
    } catch (error) {
      setLoading(false);
      // Handle error
    }
  };

  // Redirect if already logged in
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  // Automatically switch form based on current URL
  useEffect(() => {
    if (location.pathname === "/register") {
      setIsLogin(false);
      setActive(true);
    } else if (location.pathname === "/login") {
      setIsLogin(true);
      setActive(false);
    }
  }, [location.pathname]);

  return (
    <div className={`container ${active ? 'active' : ''}`}> {/* Add active class dynamically */}
      <div className="curved-shape"></div>
      <div className="curved-shape2"></div>

      {isLogin ? (
        <div className="form Login">
          <h2 className="animation" style={{ '--D': 0, '--S': 21 }}>Login</h2>
          <form onSubmit={submitHandler}>
            <div className="input-box animation" style={{ '--D': 1, '--S': 22 }}>
              <input 
                type="text" 
                id="Email" 
                className="input" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} // Capture input with onChange
              />
              <label htmlFor="Email" className="label">Email</label>
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box animation" style={{ '--D': 2, '--S': 23 }}>
              <input 
                type="password" 
                id="Password" 
                className="input" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} // Capture input with onChange
              />
              <label htmlFor="Password" className="label">Password</label>
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="input-box animation" style={{ '--D': 3, '--S': 24 }}>
              <button className="button" type="submit">Login</button>
            </div>
            <div className="reg-link animation" style={{ '--D': 4, '--S': 25 }}>
              <p>
                Don't have an account? 
                <a href="/register" onClick={(e) => { e.preventDefault(); toggleForm(); }} className="SignUpLink"> SignUp</a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className="form Register">
          <h2 className="animation" style={{ '--li': 17, '--S': 0 }}>Register</h2>
          <form onSubmit={submitHandler}>
            <div className="input-box animation" style={{ '--li': 18, '--S': 1 }}>
              <input 
                type="text" 
                id="Username" 
                className="input" 
                required 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} // Capture input with onChange
              />
              <label htmlFor="Username" className="label">Username</label>
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box animation" style={{ '--li': 18, '--S': 1 }}>
              <input 
                type="text" 
                id="Email" 
                className="input" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} // Capture input with onChange
              />
              <label htmlFor="Email" className="label">Email</label>
              <i className='bx bxs-user'></i>
            </div>
            <div className="input-box animation" style={{ '--li': 19, '--S': 2 }}>
              <input 
                type="password" 
                id="Password" 
                className="input" 
                required 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} // Capture input with onChange
              />
              <label htmlFor="Password" className="label">Password</label>
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className="input-box animation" style={{ '--li': 20, '--S': 3 }}>
              <button className="button" type="submit">Register</button>
            </div>
            <div className="reg-link animation" style={{ '--li': 21, '--S': 4 }}>
              <p>
                Already have an account? 
                <a href="/login" onClick={(e) => { e.preventDefault(); toggleForm(); }} className="SignInLink"> Login</a>
              </p>
            </div>
          </form>
        </div>
      )}

      <div className={`info-content ${isLogin ? 'Login' : 'Register'}`}>
        <h2 className="animation" style={{ '--D':0, '--S':20 }}>Welcome!</h2>
        <p className="animation" style={{ '--D':1, '--S':21 }}>
          We are here to help!<br></br>
          stay connected with us!!
        </p>
      </div>
    </div>
  );
};

export default Login;
