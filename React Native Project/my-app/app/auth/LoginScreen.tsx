// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TextInput,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import type { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { router } from "@/.expo/types/router";

// type RootStackParamList = {
//   Login: undefined;
//   Otp: { mobile: string };
// };

// type Props = NativeStackScreenProps<RootStackParamList, "Login">;

// const LoginScreen: React.FC<Props> = ({ navigation }) => {
//   const [mobile, setMobile] = useState<string>("");

//   const handleGetOtp = () => {
//     if (mobile.length !== 10) {
//       Alert.alert("Invalid Number", "Please enter 10 digit mobile number");
//       return;
//     }

//     // API call yaha aayega
//     console.log("Sending OTP to:", mobile);

//     navigation.navigate("Otp", { mobile });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Enter Mobile Number</Text>

//       <View style={styles.inputContainer}>
//         <Text style={styles.countryCode}>+91</Text>

//         <TextInput
//           style={styles.input}
//           placeholder="Enter Mobile Number"
//           keyboardType="number-pad"
//           maxLength={10}
//           value={mobile}
//           onChangeText={setMobile}
//         />
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleGetOtp}>
//         <Text style={styles.buttonText}>Get OTP</Text>
//       </TouchableOpacity>
//       <Text onPress={() => router.push("/auth/register")} style={styles.link}>
//         New user? Register
//        </Text>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#F9FAFB",
//     justifyContent: "center",
//     padding: 24,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "600",
//     marginBottom: 24,
//     textAlign: "center",
//   },
//   inputContainer: {
//     flexDirection: "row",
//     borderWidth: 1,
//     borderColor: "#D1D5DB",
//     borderRadius: 10,
//     paddingHorizontal: 12,
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   countryCode: {
//     fontSize: 16,
//     marginRight: 8,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     fontSize: 16,
//   },
//   button: {
//     marginTop: 30,
//     backgroundColor: "#F97316",
//     paddingVertical: 14,
//     borderRadius: 10,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "600",
//   },
//   link: {
//     marginTop: 16,
//     color: "#2563eb",
//     textAlign: "center",
//     textDecorationLine: "underline",
//     fontSize: 16,
//     fontWeight: "500",
//   },
// });










import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { globalStyles } from "@/styles/globalStyles";
import { useState } from "react";
import api from "../../services/api";
import { router } from "expo-router";
// Login screen component
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const user = res.data.user;

      if (user.role === "BUYER") {
        router.replace("../(buyer)/profile");
      } else if (user.role === "SELLER") {
        router.replace("../(seller)/dashboard");
      } else if (user.role === "ADMIN") {
        router.replace("../(admin)/dashboard");
      }
    } catch (err) {
      alert("Invalid email or password");
    }
  };
  return (
    <View style={globalStyles.container}>
    <View style={globalStyles.card}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <Text onPress={() => router.push("/auth/register")} style={styles.link}>
        New user? Register
      </Text>
    </View>   
    </View>            
  );
}
// Styles for the login screen

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
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    textAlign: "center",
    color: "#2563eb",
  },
});
