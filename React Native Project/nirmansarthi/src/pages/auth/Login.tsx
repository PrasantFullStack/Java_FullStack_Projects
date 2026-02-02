import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // only numbers
    if (value.length <= 10) {
      setMobile(value);
    }
  };

  const handleGetOtp = () => {
    navigate("/otp", { state: { mobile } });
  };

  const isValid = mobile.length === 10;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-sm p-6 rounded-2xl shadow"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Enter Mobile Number
        </h2>

        <div className="flex border rounded-lg overflow-hidden mb-4">
          <span className="px-3 flex items-center bg-gray-100">+91</span>
          <input
            type="tel"
            value={mobile}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
            className="flex-1 p-3 outline-none"
          />
        </div>

        <button
          disabled={!isValid}
          onClick={handleGetOtp}
          className={`w-full py-3 rounded-xl font-semibold transition ${
            isValid
              ? "bg-orange-500 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Get OTP
        </button>
      </motion.div>
    </div>
  );
}
