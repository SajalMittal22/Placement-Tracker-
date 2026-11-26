import { useState } from "react";
import { usePlacements } from "../context/PlacementContext";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

export default function Applications() {
  const { applications, updateStatus, deleteApplication } = usePlacements();
  const { user, isAdmin } = useAuth();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const visibleApps = isAdmin
    ? applications.filter((app) => app.company === user.company)
    : applications.filter((app) => app.applicantEmail === user.email);

  const filteredApps = visibleApps.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(search.toLowerCase()) ||
      app.role.toLowerCase().includes(search.toLowerCase()) ||
      (app.applicantName || "").toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || app.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container">
      <h2>{isAdmin ? `${user.company} — Incoming Applications` : "My Applications"}</h2>

      <div className="toolbar">
        <input
          type="text"
          placeholder={isAdmin ? "Search student, company, or role..." : "Search company or role..."}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="OA">OA</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {filteredApps.length === 0 ? (
        <p className="muted">No applications found.</p>
      ) : (
        <table className="app-table">
          <thead>
            <tr>
              {isAdmin && <th>Applicant</th>}
              <th>Company</th>
              <th>Role</th>
              <th>Deadline</th>
              <th>Status</th>
              {isAdmin && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredApps.map((app) => (
              <tr key={app.id}>
                {isAdmin && <td>{app.applicantName || "Unknown"}</td>}
                <td><strong>{app.company}</strong></td>
                <td>{app.role}</td>
                <td>{app.deadline || "—"}</td>
                <td>
                  <StatusBadge status={app.status} />
                  {isAdmin && (
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      style={{ marginLeft: "8px" }}
                    >
                      <option value="Applied">Applied</option>
                      <option value="OA">OA</option>
                      <option value="Interview">Interview</option>
                      <option value="Offer">Offer</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  )}
                </td>
                {isAdmin && (
                  <td>
                    <button className="btn-danger" onClick={() => deleteApplication(app.id)}>
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}