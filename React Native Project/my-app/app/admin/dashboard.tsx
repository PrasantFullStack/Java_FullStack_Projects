import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import api from "../../services/api";
// Admin dashboard component
export default function AdminDashboard() {
  const router = useRouter();

  const [stats, setStats] = useState({
    users: 0,
    sellers: 0,
    products: 0,
    orders: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
//
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>

      <View style={styles.grid}>
        <Card title="Users" value={stats.users} />
        <Card title="Sellers" value={stats.sellers} />
        <Card title="Products" value={stats.products} />
        <Card title="Orders" value={stats.orders} />
      </View>

      <Text style={styles.section}>Quick Actions</Text>

      <TouchableOpacity
        style={styles.action}
        onPress={() => router.push("/admin/users")}
      >
        <Text style={styles.actionText}>Manage Users</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.action}
        onPress={() => router.push("/admin/products")}
      >
        <Text style={styles.actionText}>Manage Products</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.action}
        onPress={() => router.push("/user/orders")}
      >
        <Text style={styles.actionText}>Manage Orders</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardValue}>{value}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    backgroundColor: "#fff",
    width: "48%",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#16a34a",
  },
  cardTitle: {
    marginTop: 6,
    fontWeight: "600",
  },
  section: {
    fontSize: 16,
    fontWeight: "700",
    marginVertical: 12,
  },
  action: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  actionText: {
    fontWeight: "600",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
