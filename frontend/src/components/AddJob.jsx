import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export default function AddJob() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [notes, setNotes] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    await axios.post(`${API_BASE}/api/jobs`, {
      company,
      role,
      notes,
    });

    navigate("/dashboard");
  };

  return (
    <form onSubmit={submit}>
      <h2>Add Job</h2>

      <input
        placeholder="Company"
        onChange={e => setCompany(e.target.value)}
        required
      />

      <input
        placeholder="Role"
        onChange={e => setRole(e.target.value)}
        required
      />

      <input
        placeholder="Notes (optional)"
        onChange={e => setNotes(e.target.value)}
      />

      <button>Add</button>
    </form>
  );
}
