import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function OrderListPage() {
  const { items } = useSelector((state) => state.orders);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <p className="section-kicker mb-1">Operations</p>
          <h2 className="page-title mb-0">Orders</h2>
        </div>
        <Link to="/orders/add" className="btn btn-amber">
          Add Order
        </Link>
      </div>

      <div className="panel-box">
        <div className="table-responsive">
          <table className="table table-dark align-middle mb-0">
            <thead>
              <tr>
                <th>#</th>
                <th>Client</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Due</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.client}</td>
                  <td>
                    <span className="status-pill status-progress">
                      {order.status}
                    </span>
                  </td>
                  <td>{order.amount}</td>
                  <td>{order.due}</td>
                  <td>
                    <Link
                      to={`/orders/${order.id}`}
                      className="btn btn-sm btn-outline-light"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrderListPage;
