const STATUS_LABELS = {
  active: "Active",
  inactive: "Inactive",
  applied: "Applied",
  review: "Review",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  hired: "Hired"
};

export function StatusBadge({ status }) {
  return <span className={`status status-${status}`}>{STATUS_LABELS[status] || status}</span>;
}
