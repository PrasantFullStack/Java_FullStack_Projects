const StatCard = ({ label, value, meta, tone = "default", icon }) => {
  return (
    <div className={`stat-card ${tone}`}>
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        {icon ? <span className="stat-icon">{icon}</span> : null}
      </div>
      <strong className="stat-value">{value}</strong>
      {meta ? <small className="stat-meta">{meta}</small> : null}
    </div>
  );
};

export default StatCard;
