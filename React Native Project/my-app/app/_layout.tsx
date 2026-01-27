import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar barStyle="dark-content" />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Auth */}
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="otp" />

        {/* Buyer */}
        <Stack.Screen name="(screen)/home" />
        <Stack.Screen name="(buyer)/product" />
        <Stack.Screen name="(user)/cart" />
        <Stack.Screen name="(user)/checkout" />
        <Stack.Screen name="(user)/orders" />
        <Stack.Screen name="(user)/address" />

        {/* Seller */}
        <Stack.Screen name="/dashboard" />

        {/* Admin */}
        <Stack.Screen name="vender/dashboard" />
      </Stack>
    </>
  );
}
