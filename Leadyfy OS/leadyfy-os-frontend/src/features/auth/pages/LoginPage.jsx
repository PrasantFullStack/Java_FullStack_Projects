import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFailure, loginStart, loginSuccess } from "../authSlice";

const demoUsers = {
  admin: {
    email: "admin@leadyfy.io",
    password: "admin123",
    role: "ADMIN",
    name: "System Admin",
  },
  client: {
    email: "client@leadyfy.io",
    password: "client123",
    role: "CLIENT",
    name: "Client User",
  },
};

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: "admin@leadyfy.io",
    password: "admin123",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const demoAccount = Object.values(demoUsers).find(
      (user) => user.email === form.email && user.password === form.password,
    );

    if (!demoAccount) {
      dispatch(
        loginFailure(
          "Invalid email or password. Try the demo credentials provided below.",
        ),
      );
      return;
    }

    dispatch(loginStart());
    const token = `demo-token-${demoAccount.role.toLowerCase()}`;

    dispatch(loginSuccess({ token, user: { ...demoAccount } }));
    navigate("/dashboard");
  };

  return (
    <div className="auth-shell d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card card shadow border-0">
        <div className="card-body p-4 p-lg-5">
          <div className="text-center mb-4">
            <div className="brand-mark mb-2">Leadyfy OS</div>
            <h2 className="fw-bold mb-1">Welcome back</h2>
            <p className="text-muted">Sign in to manage your video workflow.</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            {error && <div className="alert alert-danger py-2">{error}</div>}

            <button
              className="btn btn-amber w-100"
              type="submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-4 small text-muted">
            <p className="mb-1">
              <strong>Demo admin:</strong> admin@leadyfy.io / admin123
            </p>
            <p className="mb-0">
              <strong>Demo client:</strong> client@leadyfy.io / client123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
