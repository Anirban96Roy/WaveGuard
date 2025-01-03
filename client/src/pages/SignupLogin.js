import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom"; 
import '../customCSS/login.css';
import axios from "axios";
import Layout from "../components/Layout/Layout";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true); 
  const [active, setActive] = useState(false);  
  const [username, setUsername] = useState(''); 
  const [contact, setContact] = useState('');   
  const [email, setEmail] = useState('');       
  const [password, setPassword] = useState(''); 
  const navigate = useNavigate();
  const loc = useLocation();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState(''); 
  
  // Location states
  const [locations, setLocations] = useState([]);
  const [selectedZilla, setSelectedZilla] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedUnion, setSelectedUnion] = useState("");
  const [upazilas, setUpazilas] = useState([]);
  const [unions, setUnions] = useState([]);

  // Fetch locations data
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await axios.get("/locations");
        setLocations(data);
      } catch (error) {
        console.error("Error fetching locations:", error.message);
      }
    };
    fetchLocations();
  }, []);
  
  // Update upazilas when zilla changes
  useEffect(() => {
    if (selectedZilla) {
      const zilladata = locations.find((location) => location.zilla === selectedZilla);
      if (zilladata) {
        setUpazilas(zilladata.upazilas || []);
        setSelectedUpazila(""); // Reset upazila selection
        setSelectedUnion(""); // Reset union selection
        setUnions([]); // Clear unions list
      }
    } else {
      setUpazilas([]);
      setUnions([]);
      setSelectedUpazila("");
      setSelectedUnion("");
    }
  }, [selectedZilla, locations]);
  
  // Update unions when upazila changes
  useEffect(() => {
    if (selectedUpazila && upazilas.length > 0) {
      const upazilaData = upazilas.find((upa) => upa.name === selectedUpazila);
      if (upazilaData) {
        setUnions(upazilaData.unions || []);
        setSelectedUnion(""); // Reset union selection
      }
    } else {
      setUnions([]);
      setSelectedUnion("");
    }
  }, [selectedUpazila, upazilas]);

  useEffect(() => {
    const roleFromURL = searchParams.get("role");
    if (roleFromURL) {
      setRole(roleFromURL);
    }
  }, [searchParams]);

  const toggleForm = () => {
    setIsLogin((prev) => !prev);
    setActive((prev) => !prev);
  };
  

  const submitHandler = async (e) => {
    e.preventDefault();
    const location = `${selectedZilla}, ${selectedUpazila}, ${selectedUnion}`;
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
        localStorage.setItem("user", JSON.stringify({ ...data.user, token: data.token, password: "" }));
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
    <Layout>
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
                <br></br>
                <p> </p> 
                <a href='/register?role=volunteer'
  onClick={(e) => { e.preventDefault(); toggleForm(); navigate('/register?role=volunteer'); }} 
  className="SignUpLink"
> 
  SignUp as a Volunteer
</a>
<p>OR</p>
<a href='/register?role=victim'
  onClick={(e) => { e.preventDefault(); toggleForm(); navigate('/register?role=victim'); }} 
  className="SignUpLink"
> 
  SignUp as a Victim
</a>
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

            {/* Location Selection */}
            <div className="input-box">
              <select 
                value={selectedZilla} 
                onChange={(e) => setSelectedZilla(e.target.value)} 
                required
                className="input"
              >
                <option value="">Select Zilla</option>
                {locations.map((loc) => (
                  <option key={loc._id} value={loc.zilla}>
                    {loc.zilla}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-box">
              <select 
                value={selectedUpazila} 
                onChange={(e) => setSelectedUpazila(e.target.value)} 
                required
                disabled={!selectedZilla}
                className="input"
              >
                <option value="">Select Upazila</option>
                {upazilas.map((upa) => (
                  <option key={upa.name} value={upa.name}>
                    {upa.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-box">
              <select 
                value={selectedUnion} 
                onChange={(e) => setSelectedUnion(e.target.value)} 
                required
                disabled={!selectedUpazila}
                className="input"
              >
                <option value="">Select Union</option>
                {unions.map((uni) => (
                  <option key={uni} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
            </div>

            <div className="input-box">
              <button className="button" type="submit">Register</button>
            </div>
            <div className="reg-link">
              <p>
                Already have an account? 
                <a href="/login" onClick={(e) => { e.preventDefault(); toggleForm(); navigate('/login')}} className="SignUpLink"> Login</a>
              </p>
            </div>
          </form>
        </div>
      )}

      <div className={`info-content ${isLogin ? 'Login' : 'Register'}`}>
        <h2>Welcome!</h2>
        <p>We are here to help!<br />Stay connected with us!!</p>
      </div>
    </div>
    </Layout>);
};

export default Login;