import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addShoot } from "../shootSlice";

function ScheduleShootPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", date: "", location: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addShoot({ id: Date.now(), ...form, status: "Scheduled" }));
    navigate("/shoots");
  };

  return (
    <div className="panel-box">
      <h3 className="mb-3">Schedule Shoot</h3>
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
          <label className="form-label">Date</label>
          <input
            name="date"
            type="date"
            className="form-control"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Location</label>
          <input
            name="location"
            className="form-control"
            value={form.location}
            onChange={handleChange}
          />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-amber" type="submit">
            Save Schedule
          </button>
          <button
            className="btn btn-outline-light"
            type="button"
            onClick={() => navigate("/shoots")}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default ScheduleShootPage;
