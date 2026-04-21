import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import AdminLogin from "./AdminLogin";
import Admins from "./Admins";
import Buyers from "./Buyers";
import Categories from "./Categories";
import SidebarItem from "./components/SidebarItem";
import Dashboard from "./Dashboard";
import Disputes from "./Disputes";
import Orders from "./Orders";
import Payments from "./Payments";
import Reports from "./Reports";
import Settings from "./Settings";
import Support from "./Support";
import Vendors from "./Vendors";

const Drawer = createDrawerNavigator();

const menuItems = [
  { name: "Dashboard", icon: "home-outline", component: Dashboard },
  { name: "Orders", icon: "clipboard-outline", component: Orders },
  { name: "Vendors", icon: "business-outline", component: Vendors },
  { name: "Buyers", icon: "people-outline", component: Buyers },
  { name: "Categories", icon: "grid-outline", component: Categories },
  { name: "Payments", icon: "card-outline", component: Payments },
  { name: "Disputes", icon: "alert-circle-outline", component: Disputes },
  { name: "Reports", icon: "bar-chart-outline", component: Reports },
  { name: "Support", icon: "help-circle-outline", component: Support },
  { name: "Admins", icon: "shield-checkmark-outline", component: Admins },
  { name: "Settings", icon: "settings-outline", component: Settings },
];

function CustomDrawerContent({ navigation, state }: any) {
  const activeRoute = state.routes[state.index].name;
  // added activeRoute to determine which menu item is currently active and apply styling accordingly
  return (
    <View style={styles.drawerContainer}>
      <View style={styles.header}>
        <Text style={styles.appName}>BuildMart</Text>
      </View>

      <ScrollView style={styles.menuContainer}>
        {menuItems.map((item) => (
          <SidebarItem
            key={item.name}
            icon={item.icon as any}
            label={item.name}
            isActive={activeRoute === item.name}
            onPress={() => navigation.navigate(item.name)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default function AdminLayout() {
  return (
    <Drawer.Navigator
      initialRouteName="AdminLogin"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="AdminLogin" component={AdminLogin} />
      {menuItems.map((item) => (
        <Drawer.Screen
          key={item.name}
          name={item.name}
          component={item.component}
        />
      ))}
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: "#1e40af", // Dark blue background
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#3b82f6",
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  menuContainer: {
    flex: 1,
    paddingTop: 10,
  },
});
