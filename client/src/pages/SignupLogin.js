import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import styles from '../customCSS/signuplogin.module.css';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);  // Controls whether we're on Login or Register form
  const [active, setActive] = useState(false);  // Controls the 'active' class on container
  const navigate = useNavigate();
  const location = useLocation();

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

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const endpoint = isLogin ? "/users/login" : "/users/register";
      const { data } = await axios.post(endpoint, values);
      setLoading(false);
      message.success(`${isLogin ? "Login" : "Registration"} successful`);
      
      if (isLogin) {
        localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
        navigate("/");
      } else {
        toggleForm();  // Switch to login after successful registration
      }
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
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
    <div className={`${styles.container} ${active ? styles.active : ''}`}> {/* Add active class dynamically */}
      <div className={styles['curved-shape']}></div>
      <div className={styles['curved-shape2']}></div>

      {isLogin ? (
        <div className={`${styles.form} ${styles.Login}`}>
          <h2 className={styles.animation} style={{ '--D': 0, '--S': 21 }}>Login</h2>
          <form onSubmit={(e) => { e.preventDefault(); submitHandler(); }}>
            <div className={`${styles['input-box']} ${styles.animation}`} style={{ '--D': 1, '--S': 22 }}>
              <input type="text" id="Username" className={styles.input} required />
              <label htmlFor="Username" className={styles.label}>Username</label>
              <i className='bx bxs-user'></i>
            </div>
            <div className={`${styles['input-box']} ${styles.animation}`} style={{ '--D': 2, '--S': 23 }}>
              <input type="password" id="Password" className={styles.input} required />
              <label htmlFor="Password" className={styles.label}>Password</label>
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className={`${styles['input-box']} ${styles.animation}`} style={{ '--D': 3, '--S': 24 }}>
              <button className={styles.button} type="submit">Login</button>
            </div>
            <div className={`${styles['reg-link']} ${styles.animation}`} style={{ '--D': 4, '--S': 25 }}>
              <p>
                Don't have an account? 
                <a href="/login" onClick={(e) => { e.preventDefault(); toggleForm(); }} className={styles.SignUpLink}> SignUp</a>
              </p>
            </div>
          </form>
        </div>
      ) : (
        <div className={`${styles.form} ${styles.Register}`}>
          <h2 className={styles.animation} style={{ '--li': 17, '--S': 0 }}>Register</h2>
          <form onSubmit={(e) => { e.preventDefault(); submitHandler(); }}>
            <div className={`${styles['input-box']} ${styles.animation}`} style={{ '--li': 18, '--S': 1 }}>
              <input type="text" id="Username" className={styles.input} required />
              <label htmlFor="Username" className={styles.label}>Username</label>
              <i className='bx bxs-user'></i>
            </div>
            <div className={`${styles['input-box']} ${styles.animation}`} style={{ '--li': 19, '--S': 2 }}>
              <input type="password" id="Password" className={styles.input} required />
              <label htmlFor="Password" className={styles.label}>Password</label>
              <i className='bx bxs-lock-alt'></i>
            </div>
            <div className={`${styles['input-box']} ${styles.animation}`} style={{ '--li': 20, '--S': 3 }}>
              <button className={styles.button} type="submit">Register</button>
            </div>
            <div className={`${styles['reg-link']} ${styles.animation}`} style={{ '--li': 21, '--S': 4 }}>
              <p>
                Already have an account? 
                <a href="/register" onClick={(e) => { e.preventDefault(); toggleForm(); }} className={styles.SignInLink}> Login</a>
              </p>
            </div>
          </form>
        </div>
      )}

      <div className={`${styles['info-content']} ${isLogin ? styles.Login : styles.Register}`}>
        <h2 className={styles.animation} style={{ '--D':0, '--S':20 }}>Welcome!</h2>
        <p className={styles.animation} style={{ '--D':1, '--S':21 }}>
          We are here to help!<br></br>
          Stay connected with us!!
        </p>
      </div>
    </div>
  );
};

export default Login;
