// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [, setUser] = useState(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        history.push("/upload");
      }
    });
    return () => unsubscribe();
  }, [auth, history]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(""); // clear error if success
    } catch (err) {
      console.error(err);
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center", color: "#fff" }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} style={{ marginTop: "20px" }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: "10px", width: "250px", marginBottom: "10px" }}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", width: "250px" }}
        />
        <br />
        <button type="submit" style={{ padding: "10px 20px", marginTop: "20px" }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "red", marginTop: "20px" }}>{error}</p>}
    </div>
  );
}
