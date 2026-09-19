const SectionCard = ({ title, subtitle, action, children }) => {
  return (
    <div className="panel-box h-100">
      <div className="panel-header">
        <div>
          <p className="section-kicker mb-1">{subtitle}</p>
          <h5 className="panel-title mb-0">{title}</h5>
        </div>
        {action}
      </div>
      <div className="panel-body">{children}</div>
    </div>
  );
};

export default SectionCard;
