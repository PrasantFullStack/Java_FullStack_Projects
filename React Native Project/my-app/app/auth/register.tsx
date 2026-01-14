import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import api from "../../services/api";
import { router } from "expo-router";

export default function Register() {
  const [phoneNumber, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
         
        phoneNumber,
        password,
        role,
      });

      alert("Registration successful");
      router.replace("/auth/login");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput placeholder="Phone number" value={phoneNumber} onChangeText={setPhone} style={styles.input} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

  <View style={{ flexDirection: "row", marginBottom: 15 }}>
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginRight: 20,
      }}
      onPress={() => setRole("BUYER")}
    >
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#16a34a",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 6,
        }}
      >
        {role === "BUYER" && (
          <View
            style={{
              height: 12,
              width: 14,
              borderRadius: 6,
              backgroundColor: "#16a34a",
            }}
          />
        )}
      </View>
      <Text>Buyer </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={() => setRole("SELLER")}
    >
      <View
        style={{
          height: 20,
          width: 20,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#16a34a",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 6,
        }}
      >
        {role === "SELLER" && (
          <View
            style={{
              height: 12,
              width: 12,
              borderRadius: 6,
              backgroundColor: "#16a34a",
            }}
          />
        )}
      </View>
      <Text>Seller  </Text>
    </TouchableOpacity>
  </View>

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#16a34a",
    padding: 15,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});
