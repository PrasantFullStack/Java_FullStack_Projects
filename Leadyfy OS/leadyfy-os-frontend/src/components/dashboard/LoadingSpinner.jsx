const LoadingSpinner = ({ label = "Loading dashboard..." }) => {
  return (
    <div className="loading-box">
      <div
        className="spinner-border text-warning"
        role="status"
        aria-label={label}
      />
      <span className="ms-3">{label}</span>
    </div>
  );
};

export default LoadingSpinner;
