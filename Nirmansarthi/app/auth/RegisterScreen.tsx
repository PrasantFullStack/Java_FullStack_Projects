import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Role = "BUYER" | "SELLER";

export default function RegisterScreen() {
  const { mobile } = useLocalSearchParams<{ mobile?: string }>();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "BUYER" as Role,
  });

  const [error, setError] = useState("");

  const handleChange = (name: string, value: string) => {
    if (name === "email") value = value.trim();
    setForm({ ...form, [name]: value });
    setError("");
  };

  const validate = () => {
    if (!form.fullName.trim()) return "Full name required";
    if (!mobile) return "Mobile missing";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return "Invalid email";
    if (form.password.length < 6) return "Password min 6 chars";
    if (form.password !== form.confirmPassword) return "Passwords do not match";
    return "";
  };

  const isFormValid =
    form.fullName.trim().length > 0 &&
    /^\S+@\S+\.\S+$/.test(form.email) &&
    form.password.length >= 6 &&
    form.confirmPassword.length >= 6 &&
    form.password === form.confirmPassword;

  const handleSubmit = () => {
    const msg = validate();
    if (msg) {
      setError(msg);
      return;
    }

    const payload = { ...form, mobile };
    console.log("Register Payload:", payload);

    // Navigate to tabs based on role
    if (payload.role === "SELLER") {
      router.replace("/(tabs)/explore"); // Assuming seller goes to explore
    } else {
      router.replace("/"); // Buyer goes to home (index)
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TextInput
          placeholder="Full Name"
          value={form.fullName}
          onChangeText={(v) => handleChange("fullName", v)}
          style={styles.input}
        />

        <TextInput
          value={mobile}
          editable={false}
          style={styles.inputDisabled}
        />

        <TextInput
          placeholder="Email"
          value={form.email}
          keyboardType="email-address"
          onChangeText={(v) => handleChange("email", v)}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          value={form.password}
          secureTextEntry
          onChangeText={(v) => handleChange("password", v)}
          style={styles.input}
        />

        <TextInput
          placeholder="Confirm Password"
          value={form.confirmPassword}
          secureTextEntry
          onChangeText={(v) => handleChange("confirmPassword", v)}
          style={styles.input}
        />

        <View style={styles.roleBox}>
          <TouchableOpacity
            onPress={() => handleChange("role", "BUYER")}
            style={[styles.roleBtn, form.role === "BUYER" && styles.roleActive]}
          >
            <Text>Buyer</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleChange("role", "SELLER")}
            style={[
              styles.roleBtn,
              form.role === "SELLER" && styles.roleActive,
            ]}
          >
            <Text>Seller</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={!isFormValid}
          onPress={handleSubmit}
          style={[styles.button, !isFormValid && styles.buttonDisabled]}
        >
          <Text style={styles.btnText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f3f4f6",
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 12,
  },
  error: {
    backgroundColor: "#fee2e2",
    color: "#b91c1c",
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  inputDisabled: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#eee",
    marginBottom: 10,
  },
  roleBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
  roleBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    marginHorizontal: 4,
  },
  roleActive: {
    backgroundColor: "#dbeafe",
    borderColor: "#2563eb",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#9ca3af",
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
