import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import type { StackNavigationProp } from '@react-navigation/stack';

type SplashScreenProps = {
  navigation: StackNavigationProp<any>;
};

const SplashScreen = ({ navigation }: SplashScreenProps) => {
  useEffect(() => {
    setTimeout(() => {
      // yaha token check logic aayega future me
      navigation.replace("Login");
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      {/* <Image
        source={require("../../assets/logo.png")}
        style={styles.logo}
      /> */}

      <Text style={styles.title}>Nirmansarthi</Text>
      <Text style={styles.tagline}>Smart Way To Build Smarter</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: "contain",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  tagline: {
    marginTop: 8,
    fontSize: 14,
    color: "#E5E7EB",
  },
});
