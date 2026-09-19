import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addClient } from "../clientSlice";

function AddClientPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", segment: "Agency" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addClient({ id: Date.now(), ...form, status: "Active" }));
    navigate("/clients");
  };

  return (
    <div className="panel-box">
      <div className="panel-header mb-3">
        <h3 className="mb-0">Add Client</h3>
      </div>

      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Client Name</label>
          <input
            name="name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Segment</label>
          <select
            name="segment"
            className="form-select"
            value={form.segment}
            onChange={handleChange}
          >
            <option value="Agency">Agency</option>
            <option value="Brand">Brand</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
        <div className="col-12 d-flex gap-2">
          <button type="submit" className="btn btn-amber">
            Save Client
          </button>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={() => navigate("/clients")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddClientPage;
