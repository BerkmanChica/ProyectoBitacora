import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const role = await getRole(user.uid);

      switch (role) {
        case "admin":
          navigate("/ppalAdmin");
          break;
        case "inves":
          navigate("/ppalInv");
          break;
        case "colab":
          navigate("/ppalColab");
          break;
        default:
          setError("Invalid user role");
      }
    } catch (err) {
      setError("Authentication error: " + err.message);
    }
  };

  const getRole = async (uid) => {
    const userDocRef = doc(db, "usuarios", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data().rol;
    } else {
      throw new Error("User not found");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <div className="login-options">
            <label className="custom-checkbox">
              <input type="checkbox" className="checkbox-input" />
              <span className="checkbox-mark"></span>
              Remember me
            </label>
            <a href="#" className="forgot-password">
              Forgot Password
            </a>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {error && <p className="login-error">{error}</p>}
        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register" className="register-link-text">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;