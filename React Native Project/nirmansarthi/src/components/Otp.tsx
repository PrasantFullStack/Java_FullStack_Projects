import { useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

export default function Otp() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.state?.mobile;

  const handleVerify = () => {
    if (otp.length !== 4) {
      alert("Enter valid OTP");
      return;
    }
    navigate("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-sm p-6 rounded-2xl shadow"
      >
        <h2 className="text-2xl font-bold text-center mb-2">
          Verify OTP
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Sent to +91 {mobile}
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          maxLength={4}
          className="w-full text-center tracking-widest text-xl border p-3 rounded-lg mb-4"
        />

        <button
          onClick={handleVerify}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
        >
          Verify
        </button>
      </motion.div>
    </div>
  );
}
