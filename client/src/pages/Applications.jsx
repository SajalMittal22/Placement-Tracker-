import { usePlacements } from "../context/PlacementContext";

export default function Applications() {
  const { applications, updateStatus, deleteApplication } = usePlacements();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Applications</h2>
      {applications.map((app) => (
        <div
          key={app.id}
          style={{ display: "flex", gap: "16px", alignItems: "center", marginBottom: "10px" }}
        >
          <strong>{app.company}</strong> — {app.role} (Due: {app.deadline})
          <select
            value={app.status}
            onChange={(e) => updateStatus(app.id, e.target.value)}
          >
            <option value="Applied">Applied</option>
            <option value="OA">OA</option>
            <option value="Interview">Interview</option>
            <option value="Offer">Offer</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button onClick={() => deleteApplication(app.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}