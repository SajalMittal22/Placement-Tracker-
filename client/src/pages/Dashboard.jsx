import { usePlacements } from "../context/PlacementContext";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const { applications } = usePlacements();

  const stats = [
    { label: "Total Applied", value: applications.length },
    { label: "Online Assessments", value: applications.filter((a) => a.status === "OA").length },
    { label: "Interviews", value: applications.filter((a) => a.status === "Interview").length },
    { label: "Offers", value: applications.filter((a) => a.status === "Offer").length },
  ];

  const today = new Date().toISOString().split("T")[0];
  const upcoming = applications
    .filter((a) => a.deadline && a.deadline >= today && a.status !== "Rejected")
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 5);

  return (
    <div className="container">
      <h2>Dashboard</h2>

      <div className="stats-grid">
        {stats.map((s) => (
          <div className="stat-card" key={s.label}>
            <span className="stat-label">{s.label}</span>
            <strong className="stat-value">{s.value}</strong>
          </div>
        ))}
      </div>

      <div className="section">
        <h3>Upcoming Deadlines</h3>
        {upcoming.length === 0 ? (
          <p className="muted">No upcoming deadlines.</p>
        ) : (
          <div className="deadline-list">
            {upcoming.map((app) => (
              <div className="deadline-item" key={app.id}>
                <div>
                  <strong>{app.company}</strong> — {app.role}
                </div>
                <div className="deadline-meta">
                  <span>Due: {app.deadline}</span>
                  <StatusBadge status={app.status} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}