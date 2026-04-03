import { router } from "expo-router";
import { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function LoginScreen() {
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");

  const handleChange = (text: string) => {
    const value = text.replace(/\D/g, "");
    if (value.length <= 10) {
      setMobile(value);
      setError(""); // Clear error on change
    }
  };

  const validateMobile = (number: string) => {
    if (number.length !== 10) {
      return "Mobile number must be 10 digits";
    }
    if (!/^[6-9]/.test(number)) {
      return "Mobile number must start with 6, 7, 8, or 9";
    }
    return "";
  };

  const handleGetOtp = () => {
    const validationError = validateMobile(mobile);
    if (validationError) {
      setError(validationError);
      return;
    }

    router.push({
      pathname: "/auth/Otp",
      params: { mobile },
    });
  };

  const isValid = mobile.length === 10 && !validateMobile(mobile);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Enter Mobile Number</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <View style={styles.inputRow}>
          <Text style={styles.code}>+91</Text>

          <TextInput
            value={mobile}
            onChangeText={handleChange}
            placeholder="Enter Mobile Number"
            keyboardType="number-pad"
            style={styles.input}
            maxLength={10}
          />
        </View>

        <TouchableOpacity
          disabled={!isValid}
          onPress={handleGetOtp}
          style={[styles.button, !isValid && styles.disabled]}
        >
          <Text style={styles.buttonText}>Get OTP</Text>
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
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    elevation: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  error: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 16,
  },
  code: {
    paddingHorizontal: 12,
    backgroundColor: "#eee",
    textAlignVertical: "center",
    fontSize: 16,
  },
  input: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f97316",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  disabled: {
    backgroundColor: "#d1d5db",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
