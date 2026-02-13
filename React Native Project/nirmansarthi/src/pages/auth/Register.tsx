import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

type Role = "BUYER" | "SELLER";

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const mobile = location.state?.mobile || "";

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "BUYER" as Role,
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "email" ? value.trim() : value,
    }));

    setError("");
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name required";
    if (!mobile) return "Mobile missing";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email";
    if (form.password.length < 6) return "Password min 6 chars";
    if (form.password !== form.confirmPassword)
      return "Passwords do not match";
    if (!form.role) return "Select role";
    return "";
  };

  // 🔥 Single source of truth
  const isFormValid = validate() === "";

  const handleSubmit = () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    const payload = { ...form, mobile };
    console.log("Register Payload:", payload);

    // TODO: API call

    if (payload.role === "SELLER") {
      navigate("/vendor/dashboard");
    } else {
      navigate("/buyer/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-sm p-6 rounded-2xl shadow"
      >
        <h2 className="text-2xl font-bold text-center mb-4">
          Create Account
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 p-2 rounded mb-3 text-sm">
            {error}
          </p>
        )}

        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-3"
        />

        <input
          value={mobile}
          disabled
          className="w-full p-3 border rounded-xl mb-3 bg-gray-100"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-3"
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-4"
        />

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl mb-4"
        >
          <option value="BUYER">Buyer</option>
          <option value="SELLER">Seller</option>
        </select>

        <button
          disabled={!isFormValid}
          onClick={handleSubmit}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            isFormValid
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Register
        </button>
      </motion.div>
    </div>
  );
}
