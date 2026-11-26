const colors = {
  Applied: { bg: "#e0f2fe", text: "#0369a1" },
  OA: { bg: "#fef3c7", text: "#b45309" },
  Interview: { bg: "#ede9fe", text: "#6d28d9" },
  Offer: { bg: "#dcfce7", text: "#15803d" },
  Rejected: { bg: "#fee2e2", text: "#b91c1c" },
};

export default function StatusBadge({ status }) {
  const style = colors[status] || { bg: "#f3f4f6", text: "#374151" };
  return (
    <span
      style={{
        backgroundColor: style.bg,
        color: style.text,
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: "600",
      }}
    >
      {status}
    </span>
  );
}