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
        onPress={() => router.push("/(seller)/products")}
      >
        <Text style={styles.buttonText}>My Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(seller)/add-product")}
      >
        <Text style={styles.buttonText}>Add New Product</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logout]}
        onPress={() => router.replace("/login")}
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
