import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 20px",
        borderBottom: "1px solid #ddd"
      }}
    >
      {/* TITLE */}
      <h2 style={{ margin: 0 }}>
        <Link
          to={token ? "/dashboard" : "/login"}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Job Application Tracker
        </Link>
      </h2>

      <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/add-job">Add Job</Link>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
