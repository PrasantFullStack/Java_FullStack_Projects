import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addScript } from "../scriptSlice";

function AddScriptPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    owner: "Marketing",
    status: "Draft",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addScript({ id: Date.now(), ...form }));
    navigate("/scripts");
  };

  return (
    <div className="panel-box">
      <h3 className="mb-3">Add Script</h3>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Title</label>
          <input
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Owner</label>
          <input
            name="owner"
            className="form-control"
            value={form.owner}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-amber" type="submit">
            Save Script
          </button>
          <button
            className="btn btn-outline-light"
            type="button"
            onClick={() => navigate("/scripts")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddScriptPage;
