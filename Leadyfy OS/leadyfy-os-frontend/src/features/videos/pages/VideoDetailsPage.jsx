import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function VideoDetailsPage() {
  const { id } = useParams();
  const video = useSelector((state) =>
    state.videos.items.find((item) => String(item.id) === String(id)),
  );

  if (!video) return <div className="panel-box">Video not found.</div>;

  return (
    <div className="panel-box">
      <h3 className="mb-3">{video.title}</h3>
      <div className="feature-card">
        <p>
          <strong>Stage:</strong> {video.stage}
        </p>
        <p>
          <strong>Owner:</strong> {video.owner}
        </p>
        <p>
          <strong>Approval:</strong> {video.approval}
        </p>
        <p className="mb-0">
          This area is ready for frames, comments, exports, and review notes.
        </p>
      </div>
    </div>
  );
}

export default VideoDetailsPage;
