import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const STATUS = ["Applied", "Interview", "Offer", "Rejected"];

export default function Dashboard() {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const res = await axios.get(`${API_BASE}/api/jobs`);
    setJobs(res.data);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`${API_BASE}/api/jobs/${id}`, { status });
    fetchJobs();
  };

  const deleteJob = async (id) => {
  if (!window.confirm("Delete this job?")) return;
  await axios.delete(`${API_BASE}/api/jobs/${id}`);
  fetchJobs();
  };
  
  return (
    <div>
      <h2>Your Job Applications</h2>
      <Link to="/add-job">➕ Add Job</Link>

      {jobs.map(job => (
        <div key={job._id} style={{ border: "1px solid #333", padding: 12, marginTop: 10 }}>
          <h4>{job.company}</h4>
          <p>{job.role}</p>

        <button
        onClick={() => deleteJob(job._id)}
        style={{ marginLeft: 10, color: "red" }}
        >
        Delete
        </button>
        
        <p>
        Applied on:{" "}
        {new Date(job.appliedDate).toLocaleDateString()}
        </p>

        {job.notes && (
        <p style={{ fontStyle: "italic", opacity: 0.8 }}>
            Notes: {job.notes}
        </p>
)}

          <select
            value={job.status}
            onChange={(e) => updateStatus(job._id, e.target.value)}
          >
            {STATUS.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
