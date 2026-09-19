import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ClientListPage() {
  const { items } = useSelector((state) => state.clients);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="section-kicker mb-1">Operations</p>
          <h2 className="page-title mb-0">Clients</h2>
        </div>
        <Link to="/clients/add" className="btn btn-amber">
          Add Client
        </Link>
      </div>

      <div className="card-grid">
        {items.map((client) => (
          <div key={client.id} className="feature-card">
            <div className="d-flex justify-content-between align-items-start mb-2">
              <h5 className="mb-0">{client.name}</h5>
              <span className="status-pill status-ready">{client.status}</span>
            </div>
            <p className="meta mb-1">{client.email}</p>
            <p className="meta mb-3">{client.segment}</p>
            <div className="d-flex gap-2 flex-wrap">
              <Link
                to={`/clients/${client.id}`}
                className="btn btn-sm btn-outline-light"
              >
                View
              </Link>
              <Link
                to={`/clients/${client.id}/edit`}
                className="btn btn-sm btn-outline-light"
              >
                Edit
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientListPage;
