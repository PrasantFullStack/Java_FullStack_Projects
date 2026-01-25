import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import api from "../../services/api";

type CartItem = {
  id: number;
  productName: string;
  price: number;
  qty: number;
};

type Address = {
  id: number;
  name: string;
  city: string;
  pincode: string;
  addressLine: string;
};
// Checkout screen component
export default function Checkout() {
  const router = useRouter();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const cartRes = await api.get("/cart/my");
      const addrRes = await api.get("/address/my");

      setCart(cartRes.data);
      setAddresses(addrRes.data);

      if (addrRes.data.length) setSelectedAddress(addrRes.data[0].id);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!selectedAddress) return alert("Select address");

    try {
      await api.post("/orders/place", {
        addressId: selectedAddress,
      });

      alert("Order placed successfully");
      router.replace("/user/orders");
    } catch (e) {
      alert("Order failed");
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.section}>Select Address</Text>

      <FlatList
        data={addresses}
        keyExtractor={(i) => i.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.addressCard,
              selectedAddress === item.id && styles.activeAddress,
            ]}
            onPress={() => setSelectedAddress(item.id)}
          >
            <Text style={styles.addrName}>{item.name}</Text>
            <Text>{item.addressLine}</Text>
            <Text>
              {item.city} - {item.pincode}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.section}>Order Summary</Text>

      {cart.map((item) => (
        <View key={item.id} style={styles.row}>
          <Text>
            {item.productName} x {item.qty}
          </Text>
          <Text>₹ {item.price * item.qty}</Text>
        </View>
      ))}

      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalText}>₹ {totalAmount}</Text>
      </View>

      <TouchableOpacity style={styles.btn} onPress={placeOrder}>
        <Text style={styles.btnText}>Place Order</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
  },
  section: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 10,
  },
  addressCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#eee",
  },
  activeAddress: {
    borderColor: "#16a34a",
    backgroundColor: "#ecfdf5",
  },
  addrName: {
    fontWeight: "700",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderTopWidth: 1,
    paddingTop: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: "700",
  },
  btn: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
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
