import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

export default function SellerDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Seller Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.welcome}>Welcome Seller 👋</Text>
        <Text style={styles.subText}>
          Manage your products and orders from here
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/vendor/products" as any)}
      >
        <Text style={styles.buttonText}>My Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/vendor/add-product" as any)}
      >
        <Text style={styles.buttonText}>Add New Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logout]}
        onPress={() => router.replace("/auth/login")}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
  },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 20,
    borderRadius: 12,
    marginBottom: 32,
    width: "100%",
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    color: "#666",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logout: {
    backgroundColor: "#dc3545",
  },
});
