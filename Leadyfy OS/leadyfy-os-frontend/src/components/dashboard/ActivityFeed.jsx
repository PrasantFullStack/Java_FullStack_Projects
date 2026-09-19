const ActivityFeed = ({ items = [] }) => {
  if (!items.length) {
    return <div className="empty-inline">No recent activity.</div>;
  }

  return (
    <div className="activity-feed">
      {items.map((item) => (
        <div key={`${item.title}-${item.time}`} className="activity-row">
          <div className="activity-dot" />
          <div className="activity-copy">
            <div className="activity-title">{item.title}</div>
            <div className="activity-meta">{item.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
