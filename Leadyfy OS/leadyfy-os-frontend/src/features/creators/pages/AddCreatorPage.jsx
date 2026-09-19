import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addCreator } from "../creatorSlice";

function AddCreatorPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    specialty: "",
    availability: "Available",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCreator({ id: Date.now(), ...form }));
    navigate("/creators");
  };

  return (
    <div className="panel-box">
      <h3 className="mb-3">Add Creator</h3>
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
          <label className="form-label">Specialty</label>
          <input
            name="specialty"
            className="form-control"
            value={form.specialty}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-amber" type="submit">
            Save Creator
          </button>
          <button
            className="btn btn-outline-light"
            type="button"
            onClick={() => navigate("/creators")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCreatorPage;
