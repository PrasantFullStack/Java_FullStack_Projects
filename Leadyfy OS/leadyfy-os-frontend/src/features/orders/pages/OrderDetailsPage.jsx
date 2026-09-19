import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function OrderDetailsPage() {
  const { id } = useParams();
  const order = useSelector((state) =>
    state.orders.items.find((item) => String(item.id) === String(id)),
  );

  if (!order) return <div className="panel-box">Order not found.</div>;

  return (
    <div className="panel-box">
      <h3 className="mb-3">Order #{order.id}</h3>
      <div className="row g-3">
        <div className="col-md-6">
          <div className="feature-card h-100">
            <p>
              <strong>Client:</strong> {order.client}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Amount:</strong> {order.amount}
            </p>
            <p>
              <strong>Due:</strong> {order.due}
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="feature-card h-100">
            <p className="section-kicker mb-2">Next Steps</p>
            <ul className="mb-0 ps-3">
              <li>Review deliverable checklist</li>
              <li>Confirm script finalization</li>
              <li>Schedule production slot</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
