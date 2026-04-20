function handleAdminAccess() {
  router.push("/admin/AdminLogin");
}
//update profile
import { useThemeColor } from "@/hooks/use-theme-color";
import { Ionicons } from "@expo/vector-icons";
import { router, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Profile() {
  const router = useRouter();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");

  const handleAdminAccess = () => {
    router.push("/admin/AdminLogin");
  };

  const handleEditProfile = () => {
    Alert.alert("Edit Profile", "Profile editing feature coming soon!");
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        style: "destructive",
        onPress: () => console.log("Logout"),
      },
    ]);
  };

  const menuItems = [
    {
      icon: "person-outline",
      label: "Personal Information",
      action: handleEditProfile,
    },
    { icon: "location-outline", label: "Addresses", action: () => { } },
    { icon: "card-outline", label: "Payment Methods", action: () => { } },
    { icon: "heart-outline", label: "Wishlist", action: () => { } },
    { icon: "document-text-outline", label: "Order History", action: () => { } },
    { icon: "settings-outline", label: "Settings", action: () => { } },
    { icon: "help-circle-outline", label: "Help & Support", action: () => { } },
  ];

  const quickStats = [
    { label: "Orders", value: "24", icon: "bag-outline" },
    { label: "Wishlist", value: "12", icon: "heart-outline" },
    { label: "Reviews", value: "8", icon: "star-outline" },
    { label: "Points", value: "1,250", icon: "trophy-outline" },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: "#FFFFFF" }]}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={100} color={tintColor} />
          <TouchableOpacity
            style={styles.editAvatarButton}
            onPress={handleEditProfile}
          >
            <Ionicons name="camera" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <Text style={[styles.name, { color: textColor }]}>John Doe</Text>
        <Text style={[styles.email, { color: "#666666" }]}>
          john.doe@example.com
        </Text>
        <View style={styles.membershipContainer}>
          <Text style={styles.membershipText}>Premium Member</Text>
          <Ionicons name="checkmark-circle" size={16} color="#FFD700" />
        </View>
      </View>

      {/* Quick Stats */}
      <View style={[styles.statsContainer, { backgroundColor: "#FFFFFF" }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Quick Stats
        </Text>
        <View style={styles.statsGrid}>
          {quickStats.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Ionicons name={stat.icon as any} size={24} color={tintColor} />
              <Text style={[styles.statValue, { color: textColor }]}>
                {stat.value}
              </Text>
              <Text style={[styles.statLabel, { color: "#666666" }]}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Account Settings */}
      <View style={[styles.section, { backgroundColor: "#FFFFFF" }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Account Settings
        </Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="notifications-outline" size={24} color="#666" />
            <Text style={[styles.settingText, { color: textColor }]}>
              Push Notifications
            </Text>
          </View>
          <Switch
            value={isNotificationsEnabled}
            onValueChange={setIsNotificationsEnabled}
            trackColor={{ false: "#767577", true: tintColor }}
            thumbColor={isNotificationsEnabled ? "#FFFFFF" : "#f4f3f4"}
          />
        </View>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Ionicons name="moon-outline" size={24} color="#666" />
            <Text style={[styles.settingText, { color: textColor }]}>
              Dark Mode
            </Text>
          </View>
          <Switch
            value={isDarkMode}
            onValueChange={setIsDarkMode}
            trackColor={{ false: "#767577", true: tintColor }}
            thumbColor={isDarkMode ? "#FFFFFF" : "#f4f3f4"}
          />
        </View>
      </View>

      {/* Menu Items */}
      <View style={[styles.section, { backgroundColor: "#FFFFFF" }]}>
        <Text style={[styles.sectionTitle, { color: textColor }]}>Menu</Text>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.menuItem}
            onPress={item.action}
          >
            <Ionicons name={item.icon as any} size={24} color="#666" />
            <Text style={[styles.menuText, { color: textColor }]}>
              {item.label}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Admin Access */}
      <View style={[styles.section, { backgroundColor: "#FFFFFF" }]}>
        <TouchableOpacity
          style={[styles.adminButton, { backgroundColor: tintColor }]}
          onPress={handleAdminAccess}
        >
          <Ionicons name="shield-checkmark-outline" size={24} color="#FFFFFF" />
          <Text style={styles.adminButtonText}>Admin Dashboard</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Logout */}
      <TouchableOpacity
        style={[styles.logoutButton, { backgroundColor: "#FFFFFF" }]}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#2F5BEA",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 8,
  },
  membershipContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  membershipText: {
    fontSize: 14,
    color: "#F59E0B",
    marginRight: 4,
    fontWeight: "600",
  },
  statsContainer: {
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  section: {
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingText: {
    fontSize: 16,
    marginLeft: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
  adminButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
  },
  adminButtonText: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    marginLeft: 12,
    fontWeight: "600",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FEE2E2",
  },
  logoutText: {
    fontSize: 16,
    color: "#DC2626",
    marginLeft: 8,
    fontWeight: "500",
  },
});
