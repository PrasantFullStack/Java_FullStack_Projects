import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />

      <Stack
        initialRouteName="splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Auth */}
        <Stack.Screen name="(screens)/splashscreen" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="otp" />

        {/* Buyer */}
        <Stack.Screen name="(buyer)/home" />
        <Stack.Screen name="(buyer)/product" />
        <Stack.Screen name="(user)/cart" />
        <Stack.Screen name="(user)/checkout" />
        <Stack.Screen name="(user)/orders" />
        <Stack.Screen name="(user)/address" />

        {/* Seller */}
        <Stack.Screen name="dashboard" />

        {/* Admin */}
        <Stack.Screen name="vendor/dashboard" />
      </Stack>
    </>
  );
}
