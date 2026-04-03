import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    ViewStyle,
} from "react-native";

interface SidebarItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  isActive?: boolean;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ViewStyle;
}

export default function SidebarItem({
  icon,
  label,
  isActive = false,
  onPress,
  style,
  textStyle,
  iconStyle,
}: SidebarItemProps) {
  return (
    <TouchableOpacity
      style={[styles.container, isActive && styles.activeContainer, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={24}
        color={isActive ? "#2F5BEA" : "#FFFFFF"}
        style={[styles.icon, iconStyle as any]}
      />
      <Text style={[styles.label, isActive && styles.activeLabel, textStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 10,
  },
  activeContainer: {
    backgroundColor: "#3b82f6", // Lighter blue for active item
  },
  icon: {
    marginRight: 15,
  },
  label: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  activeLabel: {
    color: "#2F5BEA",
    fontWeight: "600",
  },
});
