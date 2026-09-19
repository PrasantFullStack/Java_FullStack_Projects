import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function ScriptDetailsPage() {
  const { id } = useParams();
  const script = useSelector((state) =>
    state.scripts.items.find((item) => String(item.id) === String(id)),
  );

  if (!script) return <div className="panel-box">Script not found.</div>;

  return (
    <div className="panel-box">
      <h3 className="mb-3">{script.title}</h3>
      <div className="feature-card">
        <p>
          <strong>Owner:</strong> {script.owner}
        </p>
        <p>
          <strong>Status:</strong> {script.status}
        </p>
        <p className="mb-0">
          This page is ready for script content, approvals, and revision
          history.
        </p>
      </div>
    </div>
  );
}

export default ScriptDetailsPage;
