import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import api from "../../services/api";

type CartItem = {
  id: number;
  productName: string;
  price: number;
  qty: number;
  image: string;
};

export default function Cart() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const res = await api.get("/cart/my");
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateQty = (id: number, type: "INC" | "DEC") => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              qty: type === "INC" ? item.qty + 1 : Math.max(1, item.qty - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const renderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={{ flex: 1, marginLeft: 10 }}>
        <Text style={styles.name}>{item.productName}</Text>
        <Text style={styles.price}>₹ {item.price}</Text>

        <View style={styles.qtyRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQty(item.id, "DEC")}
          >
            <Text>-</Text>
          </TouchableOpacity>

          <Text style={styles.qty}>{item.qty}</Text>

          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQty(item.id, "INC")}
          >
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity onPress={() => removeItem(item.id)}>
        <Text style={styles.remove}>✕</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>Cart is empty</Text>}
      />

      {cart.length > 0 && (
        <View style={styles.footer}>
          <Text style={styles.total}>Total: ₹ {totalAmount}</Text>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => router.push("/user/checkout")}
          >
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
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
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 14,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
  },
  price: {
    color: "#16a34a",
    marginVertical: 4,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  qtyBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderRadius: 6,
  },
  qty: {
    marginHorizontal: 10,
  },
  remove: {
    fontSize: 18,
    color: "#dc2626",
    marginLeft: 8,
  },
  footer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
  },
  checkoutBtn: {
    backgroundColor: "#16a34a",
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "700",
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
});
