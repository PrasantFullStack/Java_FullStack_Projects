import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// OTP Verification Screen
export default function OtpScreen() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [error, setError] = useState("");

  const inputs = useRef<Array<TextInput | null>>([]);

  const { mobile } = useLocalSearchParams<{ mobile?: string }>();

  const isOtpValid = otp.every((d) => d !== "");

  // ⏱ Timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 👉 Handle Input
  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setError(""); // Clear error on change

    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  // ⬅ Backspace
  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  // ✅ Verify
  const handleVerify = () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 4) {
      setError("Please enter complete 4-digit OTP");
      return;
    }

    // Here you would typically verify the OTP with your backend
    // For demo purposes, let's assume OTP "1234" is valid
    if (finalOtp !== "1234") {
      setError("Invalid OTP. Please try again.");
      return;
    }

    router.push({
      pathname: "/auth/RegisterScreen",
      params: { mobile },
    });
  };

  // 🔁 Resend
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimer(30);
    setError("");
    inputs.current[0]?.focus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify OTP</Text>

        <Text style={styles.subtitle}>Sent to +91 {mobile}</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {/* OTP BOXES */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => {
                inputs.current[index] = el;
              }}
              value={digit}
              maxLength={1}
              keyboardType="number-pad"
              onChangeText={(v) => handleChange(v, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              style={styles.otpBox}
            />
          ))}
        </View>

        {/* TIMER */}
        <Text style={styles.timer}>
          {timer > 0 ? `Resend OTP in 00:${timer}` : "Didn't receive OTP?"}
        </Text>

        {timer === 0 && (
          <TouchableOpacity onPress={handleResend}>
            <Text style={styles.resend}>Resend OTP</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          disabled={!isOtpValid}
          onPress={handleVerify}
          style={[styles.button, !isOtpValid && styles.buttonDisabled]}
        >
          <Text style={[styles.btnText, !isOtpValid && styles.btnDisabledText]}>
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

///
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 24,
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 24,
  },
  error: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  otpBox: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
  },
  timer: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 10,
  },
  resend: {
    textAlign: "center",
    color: "#2563eb",
    marginBottom: 20,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#d1d5db",
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  btnDisabledText: {
    color: "#6b7280",
  },
});
