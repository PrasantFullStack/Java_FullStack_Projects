import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TextInputProps,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
}

export default function InputField({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  inputStyle,
  secureTextEntry,
  ...textInputProps
}: InputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRightIconPress = () => {
    if (secureTextEntry) {
      setIsPasswordVisible(!isPasswordVisible);
    } else if (onRightIconPress) {
      onRightIconPress();
    }
  };

  const getRightIcon = () => {
    if (secureTextEntry) {
      return isPasswordVisible ? "eye-off-outline" : "eye-outline";
    }
    return rightIcon;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[styles.inputContainer, error && styles.inputContainerError]}
      >
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            size={20}
            color="#666"
            style={styles.leftIcon}
          />
        )}

        <TextInput
          style={[styles.input, inputStyle as any]}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          placeholderTextColor="#9CA3AF"
          {...textInputProps}
        />

        {(rightIcon || secureTextEntry) && (
          <TouchableOpacity
            onPress={handleRightIconPress}
            style={styles.rightIconContainer}
          >
            <Ionicons name={getRightIcon() as any} size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 16,
  },
  inputContainerError: {
    borderColor: "#EF4444",
  },
  leftIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#111827",
  },
  rightIconContainer: {
    padding: 4,
  },
  errorText: {
    fontSize: 14,
    color: "#EF4444",
    marginTop: 4,
  },
});
