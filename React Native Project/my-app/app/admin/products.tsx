import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import api from "../../services/api";

const width = Dimensions.get("window").width;

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function Products() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (id: number) => {
    try {
      await api.post("/cart/add", { productId: id, qty: 1 });
      alert("Added to cart");
    } catch {
      alert("Failed to add");
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`//product-details?id=${item.id}`)}
    >
      <Image source={{ uri: item.image }} style={styles.image} />

      <Text style={styles.name} numberOfLines={1}>
        {item.name}
      </Text>

      <Text style={styles.price}>₹ {item.price}</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => addToCart(item.id)}
      >
        <Text style={styles.btnText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
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
      <Text style={styles.title}>Products</Text>

      <FlatList
        data={products}
        keyExtractor={(i) => i.id.toString()}
        numColumns={width > 600 ? 3 : 2}
        renderItem={renderItem}
        columnWrapperStyle={{ gap: 10 }}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 14,
    marginBottom: 12,
    flex: 1,
  },
  image: {
    height: 140,
    borderRadius: 12,
    marginBottom: 8,
  },
  name: {
    fontWeight: "600",
  },
  price: {
    color: "#16a34a",
    marginVertical: 6,
    fontWeight: "700",
  },
  btn: {
    backgroundColor: "#16a34a",
    padding: 8,
    borderRadius: 10,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
