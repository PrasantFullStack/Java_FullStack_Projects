import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function TopNavbar() {
  return (
    <View style={styles.navbar}>
      {/* Left */}
      <View style={styles.left}>
        <Ionicons name="cart-outline" size={22} color="#16a34a" />
        <Text style={styles.logo}>🛒 Apna Bazar </Text>
      </View>

      {/* Right */}
      <View style={styles.right}>
        <TouchableOpacity onPress={() => router.push("/auth/login" as any)}>
          <Ionicons name="log-in-outline" size={22} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",

    // web shadow
    ...(Platform.OS === "web"
      ? { boxShadow: "0px 2px 6px rgba(0,0,0,0.08)" }
      : {
          elevation: 4,
        }),
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 6,
    color: "#16a34a",
  },
  right: {
    flexDirection: "row",
    gap: 14,
  },
});
