const toneMap = {
  approved: "badge-approved",
  pending: "badge-pending",
  urgent: "badge-urgent",
  in_progress: "badge-progress",
  draft: "badge-draft",
  default: "badge-default",
};

const StatusBadge = ({ label, tone = "default" }) => {
  const className = `status-badge ${toneMap[tone] || toneMap.default}`;
  return <span className={className}>{label}</span>;
};

export default StatusBadge;
