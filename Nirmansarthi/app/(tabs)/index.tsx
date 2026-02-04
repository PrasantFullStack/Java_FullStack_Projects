import { View, Text, StyleSheet, Image } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
// import ".../assets/images/building.png";
export default function Splash() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/auth/LoginScreen");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
     <View style={styles.container}>
     {/* <Image
    //     source={require(".../assets/images/building.png")}
    //     style={styles.logo}
    //   /> */}
      <Text style={styles.title}>NirmanSarthi</Text>
      <Text style={styles.sub}>Your Construction Partner</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d4ed8",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  sub: {
    fontSize: 14,
    color: "#e5e7eb",
    marginTop: 6,
  },
});
