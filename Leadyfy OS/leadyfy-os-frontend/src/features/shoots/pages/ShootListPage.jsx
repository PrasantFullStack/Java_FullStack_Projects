import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ShootListPage() {
  const { items } = useSelector((state) => state.shoots);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="section-kicker mb-1">Production</p>
          <h2 className="page-title mb-0">Shoots</h2>
        </div>
        <Link to="/shoots/schedule" className="btn btn-amber">
          Schedule Shoot
        </Link>
      </div>

      <div className="card-grid">
        {items.map((shoot) => (
          <div key={shoot.id} className="feature-card">
            <h5>{shoot.title}</h5>
            <p className="meta mb-1">{shoot.date}</p>
            <p className="meta mb-1">{shoot.location}</p>
            <span className="status-pill status-progress">{shoot.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShootListPage;
