import { usePlacements } from "../context/PlacementContext";

export default function Dashboard() {
  const { applications } = usePlacements();

  const stats = {
    total: applications.length,
    oa: applications.filter((a) => a.status === "OA").length,
    interview: applications.filter((a) => a.status === "Interview").length,
    offer: applications.filter((a) => a.status === "Offer").length,
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
        <div><strong>Total:</strong> {stats.total}</div>
        <div><strong>OA:</strong> {stats.oa}</div>
        <div><strong>Interviews:</strong> {stats.interview}</div>
        <div><strong>Offers:</strong> {stats.offer}</div>
      </div>
    </div>
  );
}