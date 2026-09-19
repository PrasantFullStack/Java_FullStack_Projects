import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function CreatorListPage() {
  const { items } = useSelector((state) => state.creators);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="section-kicker mb-1">Talent</p>
          <h2 className="page-title mb-0">Creators</h2>
        </div>
        <Link to="/creators/add" className="btn btn-amber">
          Add Creator
        </Link>
      </div>

      <div className="card-grid">
        {items.map((creator) => (
          <div key={creator.id} className="feature-card">
            <h5>{creator.name}</h5>
            <p className="meta mb-1">{creator.specialty}</p>
            <p className="meta mb-3">{creator.availability}</p>
            <button className="btn btn-sm btn-outline-light">Book</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CreatorListPage;
