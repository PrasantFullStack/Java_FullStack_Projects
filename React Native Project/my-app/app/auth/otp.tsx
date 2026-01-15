import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useState, useRef } from "react";
import { globalStyles } from "@/styles/globalStyles";

export default function OtpScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (index: number) => {
    if (otp[index] === "" && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const finalOtp = otp.join("");
    if (finalOtp.length < 6) {
      alert("Please enter 6 digit OTP");
      return;
    }

    alert(`OTP Verified: ${finalOtp}`);
    // call verify OTP API here
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.card}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>
          Enter the 6 digit code sent to your phone
        </Text>

        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                if (ref) inputs.current[index] = ref;
              }}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(val) => handleChange(val, index)}
              onKeyPress={({ nativeEvent }) => {
                if (nativeEvent.key === "Backspace") {
                  handleBackspace(index);
                }
              }}
            />
          ))}
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={handleVerify}>
          <Text style={globalStyles.btnText}>Verify OTP</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.resendBtn}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 6,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },

  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  otpBox: {
    width: 45,
    height: 50,
    borderWidth: 1,
    borderColor: "#16a34a",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "600",
  },

  resendBtn: {
    marginTop: 15,
    alignItems: "center",
  },

  resendText: {
    color: "#16a34a",
    fontWeight: "500",
  },
});
