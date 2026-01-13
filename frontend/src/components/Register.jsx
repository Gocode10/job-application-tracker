import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function Register() {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setError("");
    try {
      await axios.post(`${API_BASE}/api/auth/register`, data);
      navigate("/login");
    } catch (e) {
      console.log("REGISTER ERROR:", e.response);
        setError(
            e.response?.data?.message ||
            e.response?.data?.msg ||
            "Registration failed"
        );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Register</h2>

      {error && <p>{error}</p>}

      <input placeholder="Name" {...register("name")} />
      <input placeholder="Email" {...register("email")} />
      <input type="password" placeholder="Password" {...register("password")} />

      <button type="submit">Register</button>

      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
}
