import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { globalStyles } from "@/styles/globalStyles";

export default function Home() {
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.logo}>🛒 Apna Bazar</Text>

        <Text style={styles.tagline}>
          Buy • Sell • Grow your business
        </Text>

        <Text style={styles.subtitle}>
          India ka apna e-commerce platform
        </Text>

        {/* <TouchableOpacity
          style={globalStyles.button}
          onPress={() => router.push("/auth/login")}
        > */}
          {/* <Text style={globalStyles.btnText}>Login</Text>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.outlineBtn}
          onPress={() => router.push("/auth/register")}
        >
          <Text style={styles.outlineText}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    width: "100%",
    maxWidth: 460,
    padding: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },

  logo: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 8,
  },

  tagline: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },

  outlineBtn: {
    marginTop: 12,
    paddingVertical: 14,
    width: "100%",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#16a34a",
    alignItems: "center",
  },

  outlineText: {
    color: "#16a34a",
    fontSize: 16,
    fontWeight: "600",
  },
});
