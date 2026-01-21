import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import api from "../../services/api";

type User = {
  id: number;
  name: string;
  phone: string;
  role: string;
  active: boolean;
};

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: number) => {
    try {
      await api.put(`/admin/users/${id}/toggle`);
      loadUsers();
    } catch (e) {
      console.log(e);
    }
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name || "No Name"}</Text>
        <Text>{item.phone}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.btn,
          { backgroundColor: item.active ? "#dc2626" : "#16a34a" },
        ]}
        onPress={() => toggleStatus(item.id)}
      >
        <Text style={styles.btnText}>
          {item.active ? "Block" : "Unblock"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Users</Text>

      <FlatList
        data={users}
        keyExtractor={(i) => i.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
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
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
  },
  role: {
    marginTop: 4,
    color: "#16a34a",
    fontWeight: "600",
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
