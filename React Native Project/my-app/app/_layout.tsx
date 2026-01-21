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
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/register" />
        <Stack.Screen name="auth/otp" />

        {/* Buyer */}
        <Stack.Screen name="(buyer)/home" />
        <Stack.Screen name="(buyer)/product" />
        <Stack.Screen name="(buyer)/cart" />
        <Stack.Screen name="(buyer)/checkout" />
        <Stack.Screen name="(buyer)/orders" />
        <Stack.Screen name="(buyer)/address" />

        {/* Seller */}
        <Stack.Screen name="(seller)/dashboard" />

        {/* Admin */}
        <Stack.Screen name="(admin)/dashboard" />
      </Stack>
    </>
  );
}
