import React from "react";
import { Stack } from "expo-router/stack";
import { StatusBar } from "react-native";

const RootLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="auth/index" options={{ headerShown: false }} />
      <Stack.Screen name="auth/login" options={{ headerShown: true, title: "Login" }} />
      <Stack.Screen name="auth/register" options={{ headerShown: true, title: "Register" }} />
      <StatusBar barStyle="dark-content" />
      </>
  );

};