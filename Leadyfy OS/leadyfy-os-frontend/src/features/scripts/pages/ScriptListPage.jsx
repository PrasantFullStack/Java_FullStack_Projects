import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function ScriptListPage() {
  const { items } = useSelector((state) => state.scripts);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="section-kicker mb-1">Content</p>
          <h2 className="page-title mb-0">Scripts</h2>
        </div>
        <Link to="/scripts/add" className="btn btn-amber">
          Add Script
        </Link>
      </div>

      <div className="card-grid">
        {items.map((script) => (
          <div key={script.id} className="feature-card">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>{script.title}</h5>
              <span className="status-pill status-ready">{script.status}</span>
            </div>
            <p className="meta mb-0">Owner: {script.owner}</p>
            <div className="mt-3">
              <Link
                to={`/scripts/${script.id}`}
                className="btn btn-sm btn-outline-light"
              >
                Open
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScriptListPage;
