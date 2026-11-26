import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlacements } from "../context/PlacementContext";

export default function AddApplication() {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("Applied");
  const [deadline, setDeadline] = useState("");

  const { addApplication } = usePlacements();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!company || !role) return;
    addApplication({ company, role, status, deadline });
    navigate("/applications");
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "12px", maxWidth: "320px" }}>
      <h2>Add Application</h2>
      <input placeholder="Company Name" value={company} onChange={(e) => setCompany(e.target.value)} required />
      <input placeholder="Role (e.g., SDE Intern)" value={role} onChange={(e) => setRole(e.target.value)} required />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Applied">Applied</option>
        <option value="OA">OA</option>
        <option value="Interview">Interview</option>
        <option value="Offer">Offer</option>
        <option value="Rejected">Rejected</option>
      </select>
      <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
      <button type="submit">Save Application</button>
    </form>
  );
}