import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function UserProfile() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
      </View>

      {/* User Card */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>B</Text>
        </View>

        <Text style={styles.name}>Buyer Name</Text>
        <Text style={styles.email}>buyer@email.com</Text>
      </View>

      {/* Actions */}
      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => router.push("/user/orders")}
      >
        <Text style={styles.actionText}>My Orders</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => router.push("/user/cart")}
      >
        <Text style={styles.actionText}>My Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={() => router.push("/user/address")}
      >
        <Text style={styles.actionText}>Saved Addresses</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionBtn, styles.logoutBtn]}
        onPress={() => router.replace("/auth/login")}
      >
        <Text style={styles.actionText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
  },
  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    marginBottom: 30,
    elevation: 4,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#2563eb",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  avatarText: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "bold",
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    color: "#64748b",
    marginTop: 5,
  },
  actionBtn: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  actionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  logoutBtn: {
    backgroundColor: "#dc2626",
  },
});
