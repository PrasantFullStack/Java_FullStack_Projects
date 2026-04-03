import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
  const router = useRouter();

  const handleAdminAccess = () => {
    router.push('/admin/AdminLogin');
  };

  const menuItems = [
    { icon: 'person-outline', label: 'Personal Information', action: () => {} },
    { icon: 'location-outline', label: 'Addresses', action: () => {} },
    { icon: 'card-outline', label: 'Payment Methods', action: () => {} },
    { icon: 'heart-outline', label: 'Wishlist', action: () => {} },
    { icon: 'document-text-outline', label: 'Order History', action: () => {} },
    { icon: 'settings-outline', label: 'Settings', action: () => {} },
    { icon: 'help-circle-outline', label: 'Help & Support', action: () => {} },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person-circle" size={80} color="#2F5BEA" />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.email}>john.doe@example.com</Text>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem} onPress={item.action}>
            <Ionicons name={item.icon as any} size={24} color="#666" />
            <Text style={styles.menuText}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#CCC" />
          </TouchableOpacity>
        ))}

        {/* Admin Access Button */}
        <TouchableOpacity style={styles.adminButton} onPress={handleAdminAccess}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#FFFFFF" />
          <Text style={styles.adminButtonText}>Admin Dashboard</Text>
          <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={20} color="#DC2626" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
  },
  header: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#666666',
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    marginLeft: 12,
  },
  adminButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2F5BEA',
  },
  adminButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 12,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 16,
    color: '#DC2626',
    marginLeft: 8,
    fontWeight: '500',
  },
});