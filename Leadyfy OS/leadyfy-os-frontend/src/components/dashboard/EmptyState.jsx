const EmptyState = ({
  title = "No data available",
  message = "There is nothing to display right now.",
}) => {
  return (
    <div className="empty-state">
      <h6>{title}</h6>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
