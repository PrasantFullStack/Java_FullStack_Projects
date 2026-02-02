import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const navigate = useNavigate();

  const handleGetOtp = () => {
    if (mobile.length !== 10) {
      alert("Enter valid 10 digit number");
      return;
    }
    navigate("/otp", { state: { mobile } });
  };

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
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Enter Mobile Number"
            className="flex-1 p-3 outline-none"
          />
        </div>

        <button
          onClick={handleGetOtp}
          className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold"
        >
          Get OTP
        </button>
      </motion.div>
    </div>
  );
}
