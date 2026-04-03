import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const categoryData = [
  { title: "Materials", icon: "cube-outline", count: 22 },
  { title: "Equipment", icon: "construct-outline", count: 14 },
  { title: "Suppliers", icon: "people-outline", count: 30 },
  { title: "Deals", icon: "pricetags-outline", count: 9 },
];

const popularItems = [
  { title: "Cement", detail: "Portland cement 50kg", price: 220 },
  { title: "Steel Rods", detail: "TMT bars 12mm", price: 6500 },
  { title: "Sand", detail: "River sand per m3", price: 420 },
  { title: "Paint", detail: "Premium emulsion 20L", price: 4100 },
];

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>
          Find top construction products and suppliers
        </Text>
      </View>

      <View style={styles.cardRow}>
        {categoryData.map((item) => (
          <View key={item.title} style={styles.metricCard}>
            <Ionicons name={item.icon as any} size={28} color="#2F5BEA" />
            <Text style={styles.metricCount}>{item.count}</Text>
            <Text style={styles.metricLabel}>{item.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionTitle}>Popular items</Text>
        <TouchableOpacity>
          <Text style={styles.showAll}>Show all</Text>
        </TouchableOpacity>
      </View>

      {popularItems.map((item) => (
        <View key={item.title} style={styles.popularCard}>
          <View style={styles.popularContent}>
            <Text style={styles.popularTitle}>{item.title}</Text>
            <Text style={styles.popularDetail}>{item.detail}</Text>
          </View>
          <Text style={styles.popularPrice}>
            ₹{item.price.toLocaleString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F5F7FB",
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 6,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 16,
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  metricCount: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "700",
    color: "#2F5BEA",
  },
  metricLabel: {
    marginTop: 4,
    fontSize: 14,
    color: "#374151",
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
  },
  showAll: {
    color: "#2F5BEA",
    fontWeight: "600",
  },
  popularCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  popularContent: {
    flex: 1,
    marginRight: 12,
  },
  popularTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  popularDetail: {
    color: "#6B7280",
    marginTop: 4,
  },
  popularPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#059669",
  },
});
