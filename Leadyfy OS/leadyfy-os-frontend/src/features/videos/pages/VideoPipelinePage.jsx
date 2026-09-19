import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function VideoPipelinePage() {
  const { items } = useSelector((state) => state.videos);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="section-kicker mb-1">Production</p>
          <h2 className="page-title mb-0">Video Pipeline</h2>
        </div>
      </div>

      <div className="card-grid">
        {items.map((video) => (
          <div key={video.id} className="feature-card">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>{video.title}</h5>
              <span className="status-pill status-progress">{video.stage}</span>
            </div>
            <p className="meta mb-1">Owner: {video.owner}</p>
            <p className="meta mb-3">Approval: {video.approval}</p>
            <Link
              to={`/videos/${video.id}`}
              className="btn btn-sm btn-outline-light"
            >
              Open
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoPipelinePage;
