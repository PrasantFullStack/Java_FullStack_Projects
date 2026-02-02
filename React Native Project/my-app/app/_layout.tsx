import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Auth */}
        <Stack.Screen name="(screens)/splashscreen" />
        <Stack.Screen name="(auth)/login" />
        <Stack.Screen name="(auth)/register" />
        <Stack.Screen name="(auth)/otp" />

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
