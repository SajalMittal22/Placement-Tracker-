import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlacements } from "../context/PlacementContext";
import { useAuth } from "../context/AuthContext";

export default function AddApplication() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [deadline, setDeadline] = useState("");

  const { addApplication } = usePlacements();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !role) return;

    addApplication({
      company,
      role,
      deadline,
      status: "Applied",
      applicantName: user.name,
      applicantEmail: user.email,
    });
    navigate("/applications");
  };

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="login-card"
        style={{ margin: "0 auto" }}
      >
        <h2>Apply to Company</h2>
        <input
          placeholder="Company Name"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />
        <input
          placeholder="Role (e.g., SDE Intern)"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}