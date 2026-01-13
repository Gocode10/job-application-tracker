import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, data);
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
        navigate("/dashboard", { replace: true });
      }
    } catch (e) {
      setError(e.response?.data?.message || "Login failed");
    }
  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>

      {error && <p>{error}</p>}

      <input placeholder="Email" {...register("email")} />
      <input type="password" placeholder="Password" {...register("password")} />

      <button type="submit">Login</button>

      <p>
        No account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
