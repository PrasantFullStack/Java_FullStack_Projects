import { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function OtpScreen() {
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [timer, setTimer] = useState(30);

  const inputs = useRef<Array<TextInput | null>>([]);

  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const mobile = route.params?.mobile || "XXXXXXXXXX";

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
      alert("Enter complete OTP");
      return;
    }

    navigation.navigate("RegisterScreen", { mobile });
  };

  // 🔁 Resend
  const handleResend = () => {
    setOtp(["", "", "", ""]);
    setTimer(30);
    inputs.current[0]?.focus();
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Verify OTP</Text>

        <Text style={styles.subtitle}>Sent to +91 {mobile}</Text>

        {/* OTP BOXES */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => { inputs.current[index] = el; }}
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
          style={[
            styles.button,
            !isOtpValid && styles.buttonDisabled,
          ]}
        >
          <Text
            style={[
              styles.btnText,
              !isOtpValid && styles.btnDisabledText,
            ]}
          >
            Verify
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


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
     textAlign: "center"
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
