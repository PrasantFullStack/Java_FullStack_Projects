import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { updateClient } from "../clientSlice";

function EditClientPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const client = useSelector((state) =>
    state.clients.items.find((item) => String(item.id) === String(id)),
  );
  const [form, setForm] = useState(
    client || { name: "", email: "", segment: "Agency" },
  );

  useEffect(() => {
    if (client) setForm(client);
  }, [client]);

  if (!client) {
    return <div className="panel-box">Client not found.</div>;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateClient({ ...form }));
    navigate(`/clients/${id}`);
  };

  return (
    <div className="panel-box">
      <h3 className="mb-3">Edit Client</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Name</label>
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
            <option>Agency</option>
            <option>Brand</option>
            <option>Enterprise</option>
          </select>
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-amber" type="submit">
            Update
          </button>
          <button
            className="btn btn-outline-light"
            type="button"
            onClick={() => navigate("/clients")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditClientPage;
