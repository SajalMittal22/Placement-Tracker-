import { usePlacements } from "../context/PlacementContext";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const { applications } = usePlacements();
  const { user, isAdmin } = useAuth();

  const visibleApps = isAdmin
    ? applications.filter((a) => a.company === user.company)
    : applications.filter((a) => a.applicantEmail === user.email);

  const stats = [
    { label: isAdmin ? "Total Applications" : "My Applications", value: visibleApps.length },
    { label: "Online Assessments", value: visibleApps.filter((a) => a.status === "OA").length },
    { label: "Interviews", value: visibleApps.filter((a) => a.status === "Interview").length },
    { label: "Offers", value: visibleApps.filter((a) => a.status === "Offer").length },
  ];

  const today = new Date().toISOString().split("T")[0];
  const upcoming = visibleApps
    .filter((a) => a.deadline && a.deadline >= today && a.status !== "Rejected")
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 5);

  return (
    <div className="container">
      <h2>{isAdmin ? `${user.company} Dashboard` : "Student Dashboard"}</h2>

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
                  {isAdmin && app.applicantName && ` (${app.applicantName})`}
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