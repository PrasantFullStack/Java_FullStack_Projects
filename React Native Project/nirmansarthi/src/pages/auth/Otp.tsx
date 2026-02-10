import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
// 4 digit OTP component with timer and resend functionality
export default function Otp() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);
  const isOtpValid = otp.every((digit) => digit !== "");
//
//  Router
  const navigate = useNavigate();
  const location = useLocation();
  const mobile = location.state?.mobile || "XXXXXXXXXX";

  //  Timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  //  Handle Input
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  // ⬅ Handle Backspace
  const handleKeyDown = (e: any, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  //Verify
  const handleVerify = () => {
    const finalOtp = otp.join("");
    if (finalOtp.length !== 4) {
      alert("Enter complete OTP");
      return;
    }
    navigate("/register", { state: { mobile } });

  };

  // Resend
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimer(30);
    inputs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-sm p-6 rounded-2xl shadow"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Verify OTP</h2>

        <p className="text-center text-gray-500 mb-6">
          Sent to +91 {mobile}
        </p>

        {/* OTP BOXES */}
        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-14 h-14 text-center text-xl border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {/* TIMER */}
        <p className="text-center text-sm text-gray-500 mb-4">
          {timer > 0 ? `Resend OTP in 00:${timer}` : "Didn't receive OTP?"}
        </p>
        {timer === 0 && (
          <button
            onClick={handleResend}
            className="w-full text-blue-600 mb-4 font-medium"
          >
            Resend OTP
          </button>
        )}

        <button
          disabled={!isOtpValid}
          onClick={handleVerify}
          className={`w-full py-3 rounded-xl font-semibold transition ${isOtpValid
            ? "bg-blue-600 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
        >
          Verify
        </button>

      </motion.div>
    </div>
  );
}
