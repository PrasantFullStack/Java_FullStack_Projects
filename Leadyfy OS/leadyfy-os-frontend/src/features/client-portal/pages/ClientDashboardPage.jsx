import { Link } from "react-router-dom";

function ClientDashboardPage() {
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="section-kicker mb-1">Client Portal</p>
          <h2 className="page-title mb-0">Dashboard</h2>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="feature-card">
            <h5>Videos Ready</h5>
            <p className="mb-0">3 deliverables</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card">
            <h5>Pending Review</h5>
            <p className="mb-0">1 revision</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="feature-card">
            <h5>Approved</h5>
            <p className="mb-0">5 approved</p>
          </div>
        </div>
      </div>

      <div className="panel-box mt-4">
        <h5 className="mb-3">Recent Videos</h5>
        <div className="d-flex gap-2 flex-wrap">
          <Link to="/portal/review/1" className="btn btn-amber">
            Review Launch Reel
          </Link>
          <Link to="/portal/review/2" className="btn btn-outline-light">
            Review Brand Cut
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ClientDashboardPage;
