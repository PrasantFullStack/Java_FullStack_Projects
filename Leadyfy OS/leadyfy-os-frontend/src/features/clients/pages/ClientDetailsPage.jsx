import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ClientDetailsPage() {
  const { id } = useParams();
  const client = useSelector((state) =>
    state.clients.items.find((item) => String(item.id) === String(id)),
  );

  if (!client) {
    return <div className="panel-box">Client not found.</div>;
  }

  return (
    <div className="panel-box">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">{client.name}</h3>
        <Link to={`/clients/${id}/edit`} className="btn btn-amber">
          Edit Client
        </Link>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="feature-card h-100">
            <p className="section-kicker mb-2">Client Profile</p>
            <p>
              <strong>Email:</strong> {client.email}
            </p>
            <p>
              <strong>Segment:</strong> {client.segment}
            </p>
            <p>
              <strong>Status:</strong> {client.status}
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="feature-card h-100">
            <p className="section-kicker mb-2">Recent Activity</p>
            <ul className="mb-0 ps-3">
              <li>Brand review requested</li>
              <li>Video approval pending</li>
              <li>Order #102 created</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientDetailsPage;
