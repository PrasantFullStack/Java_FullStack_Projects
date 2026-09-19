import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../orderSlice";

function AddOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ client: "", amount: "$0", due: "Today" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addOrder({ id: Date.now(), ...form, status: "Draft" }));
    navigate("/orders");
  };

  return (
    <div className="panel-box">
      <h3 className="mb-3">Add Order</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Client</label>
          <input
            name="client"
            className="form-control"
            value={form.client}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Amount</label>
          <input
            name="amount"
            className="form-control"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Due</label>
          <input
            name="due"
            className="form-control"
            value={form.due}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-amber" type="submit">
            Save Order
          </button>
          <button
            className="btn btn-outline-light"
            type="button"
            onClick={() => navigate("/orders")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddOrderPage;
