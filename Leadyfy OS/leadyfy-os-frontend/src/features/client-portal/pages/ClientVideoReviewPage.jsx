import { useParams } from "react-router-dom";

function ClientVideoReviewPage() {
  const { videoId } = useParams();

  return (
    <div className="panel-box">
      <h3 className="mb-3">Video Review #{videoId}</h3>
      <div className="feature-card">
        <p>
          <strong>Title:</strong> Brand Launch Reel
        </p>
        <p>
          <strong>Status:</strong> Awaiting approval
        </p>
        <p className="mb-3">
          Comment: The pacing feels strong. We would like a tighter intro and
          brighter color grade.
        </p>
        <div className="d-flex gap-2">
          <button className="btn btn-amber">Approve</button>
          <button className="btn btn-outline-light">Request Changes</button>
        </div>
      </div>
    </div>
  );
}

export default ClientVideoReviewPage;
