import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import api from "../../services/api"; // adjust path

type OrderItem = {
  id: number;
  orderId: string;
  totalAmount: number;
  status: string;
  createdAt: string;
};

export default function Orders() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const res = await api.get("/orders/my");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: OrderItem }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.orderId}>#{item.orderId}</Text>
        <Text
          style={[
            styles.status,
            item.status === "DELIVERED" && styles.delivered,
            item.status === "PENDING" && styles.pending,
            item.status === "CANCELLED" && styles.cancelled,
          ]}
        >
          {item.status}
        </Text>
      </View>

      <Text style={styles.amount}>₹ {item.totalAmount}</Text>
      <Text style={styles.date}>
        {new Date(item.createdAt).toDateString()}
      </Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!orders.length) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>No orders found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Orders</Text>

      <FlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
  },
  status: {
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    color: "#fff",
    backgroundColor: "#999",
  },
  delivered: {
    backgroundColor: "#16a34a",
  },
  pending: {
    backgroundColor: "#f59e0b",
  },
  cancelled: {
    backgroundColor: "#dc2626",
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  date: {
    color: "#777",
    marginTop: 4,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    fontSize: 16,
    color: "#777",
  },
});
