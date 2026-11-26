import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePlacements } from "../context/PlacementContext";
import { useAuth } from "../context/AuthContext";
import { COMPANIES } from "../data/companies";

export default function AddApplication() {
  const [selectedCompany, setSelectedCompany] = useState(COMPANIES[0].name);
  const [selectedRole, setSelectedRole] = useState(COMPANIES[0].roles[0].title);
  const [error, setError] = useState("");

  const { applications, addApplication } = usePlacements();
  const { user } = useAuth();
  const navigate = useNavigate();

  const companyObj = COMPANIES.find((c) => c.name === selectedCompany);
  const roleObj = companyObj.roles.find((r) => r.title === selectedRole);

  const handleCompanyChange = (e) => {
    const newCompanyName = e.target.value;
    const newCompany = COMPANIES.find((c) => c.name === newCompanyName);
    setSelectedCompany(newCompanyName);
    setSelectedRole(newCompany.roles[0].title);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const alreadyApplied = applications.some(
      (app) =>
        app.applicantEmail === user.email &&
        app.company === selectedCompany &&
        app.role === selectedRole
    );

    if (alreadyApplied) {
      setError("You have already applied for this role.");
      return;
    }

    addApplication({
      company: selectedCompany,
      role: selectedRole,
      deadline: roleObj?.deadline || "",
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
        <h2>Apply to Open Roles</h2>

        <label>Company</label>
        <select value={selectedCompany} onChange={handleCompanyChange}>
          {COMPANIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <label>Role</label>
        <select
          value={selectedRole}
          onChange={(e) => {
            setSelectedRole(e.target.value);
            setError("");
          }}
        >
          {companyObj.roles.map((r) => (
            <option key={r.title} value={r.title}>
              {r.title} (Due: {r.deadline})
            </option>
          ))}
        </select>

        {error && <p style={{ color: "#dc2626", fontSize: "0.9rem" }}>{error}</p>}

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
}