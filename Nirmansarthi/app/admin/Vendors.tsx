import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
// This is a static mockup of a vendor management admin panel. In a real application, the vendor data would be fetched from an API and the actions would trigger navigation or API calls instead of alerts.
type VendorStatus = "Active" | "Pending" | "Suspended";
type VerificationStatus = "Verified" | "Under Review" | "Missing Docs";
type Category =
  | "Materials"
  | "Equipment"
  | "Finishing"
  | "Logistics"
  | "Safety";

type Vendor = {
  id: string;
  name: string;
  owner: string;
  category: Category;
  city: string;
  status: VendorStatus;
  verification: VerificationStatus;
  rating: number;
  orders: number;
  revenue: number;
  responseTime: string;
  joinedOn: string;
};

const VENDORS: Vendor[] = [
  {
    id: "VEN-101",
    name: "Urban Cement Co.",
    owner: "Rohan Malhotra",
    category: "Materials",
    city: "Mumbai",
    status: "Active",
    verification: "Verified",
    rating: 4.8,
    orders: 186,
    revenue: 1280000,
    responseTime: "18 mins",
    joinedOn: "12 Jan 2026",
  },
  {
    id: "VEN-102",
    name: "Steel Frame Depot",
    owner: "Megha Saini",
    category: "Materials",
    city: "Delhi",
    status: "Active",
    verification: "Verified",
    rating: 4.6,
    orders: 143,
    revenue: 975000,
    responseTime: "24 mins",
    joinedOn: "03 Feb 2026",
  },
  {
    id: "VEN-103",
    name: "Prime Bricks",
    owner: "Ankit Sharma",
    category: "Materials",
    city: "Jaipur",
    status: "Pending",
    verification: "Under Review",
    rating: 4.1,
    orders: 38,
    revenue: 214000,
    responseTime: "42 mins",
    joinedOn: "27 Mar 2026",
  },
  {
    id: "VEN-104",
    name: "Metro Tiles",
    owner: "Sana Khan",
    category: "Finishing",
    city: "Ahmedabad",
    status: "Active",
    verification: "Verified",
    rating: 4.7,
    orders: 91,
    revenue: 562000,
    responseTime: "15 mins",
    joinedOn: "19 Dec 2025",
  },
  {
    id: "VEN-105",
    name: "Rapid Scaffold",
    owner: "Vikram Desai",
    category: "Equipment",
    city: "Pune",
    status: "Suspended",
    verification: "Missing Docs",
    rating: 3.9,
    orders: 22,
    revenue: 186000,
    responseTime: "2 hrs",
    joinedOn: "08 Mar 2026",
  },
  {
    id: "VEN-106",
    name: "SafeSite Gear",
    owner: "Naina Batra",
    category: "Safety",
    city: "Bengaluru",
    status: "Pending",
    verification: "Under Review",
    rating: 4.3,
    orders: 54,
    revenue: 319000,
    responseTime: "31 mins",
    joinedOn: "11 Apr 2026",
  },
  {
    id: "VEN-107",
    name: "Golden Sand Traders",
    owner: "Imran Shaikh",
    category: "Logistics",
    city: "Hyderabad",
    status: "Active",
    verification: "Verified",
    rating: 4.5,
    orders: 126,
    revenue: 744000,
    responseTime: "22 mins",
    joinedOn: "24 Nov 2025",
  },
];

const STATUS_FILTERS: (VendorStatus | "All")[] = [
  "All",
  "Active",
  "Pending",
  "Suspended",
];

const CATEGORY_FILTERS: (Category | "All")[] = [
  "All",
  "Materials",
  "Equipment",
  "Finishing",
  "Logistics",
  "Safety",
];

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function StatusPill({
  label,
  tone,
}: {
  label: string;
  tone: "green" | "amber" | "red" | "blue";
}) {
  return (
    <View
      style={[
        styles.pill,
        tone === "green" && styles.pillGreen,
        tone === "amber" && styles.pillAmber,
        tone === "red" && styles.pillRed,
        tone === "blue" && styles.pillBlue,
      ]}
    >
      <Text
        style={[
          styles.pillText,
          tone === "green" && styles.pillTextGreen,
          tone === "amber" && styles.pillTextAmber,
          tone === "red" && styles.pillTextRed,
          tone === "blue" && styles.pillTextBlue,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

export default function Vendors() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<VendorStatus | "All">(
    "All",
  );
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All",
  );

  const filteredVendors = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return VENDORS.filter((vendor) => {
      const matchesSearch =
        normalizedQuery.length === 0 ||
        vendor.name.toLowerCase().includes(normalizedQuery) ||
        vendor.owner.toLowerCase().includes(normalizedQuery) ||
        vendor.id.toLowerCase().includes(normalizedQuery) ||
        vendor.city.toLowerCase().includes(normalizedQuery);
      const matchesStatus =
        selectedStatus === "All" || vendor.status === selectedStatus;
      const matchesCategory =
        selectedCategory === "All" || vendor.category === selectedCategory;

      return matchesSearch && matchesStatus && matchesCategory;
    }).sort((a, b) => b.revenue - a.revenue);
  }, [searchQuery, selectedCategory, selectedStatus]);

  const dashboardStats = useMemo(() => {
    const totalRevenue = filteredVendors.reduce(
      (sum, vendor) => sum + vendor.revenue,
      0,
    );
    const activeVendors = filteredVendors.filter(
      (vendor) => vendor.status === "Active",
    ).length;
    const pendingReview = filteredVendors.filter(
      (vendor) => vendor.verification !== "Verified",
    ).length;
    const avgRating =
      filteredVendors.length > 0
        ? (
            filteredVendors.reduce((sum, vendor) => sum + vendor.rating, 0) /
            filteredVendors.length
          ).toFixed(1)
        : "0.0";

    return {
      totalRevenue,
      activeVendors,
      pendingReview,
      avgRating,
    };
  }, [filteredVendors]);

  const topVendor = filteredVendors[0];

  const handleAddVendor = () => {
    Alert.alert(
      "Add vendor",
      "Vendor onboarding form can be connected here next.",
    );
  };

  const handlePrimaryAction = (vendor: Vendor) => {
    if (vendor.status === "Pending") {
      Alert.alert("Review vendor", `Open review queue for ${vendor.name}.`);
      return;
    }

    if (vendor.status === "Suspended") {
      Alert.alert("Resolve compliance", `Check documents for ${vendor.name}.`);
      return;
    }

    Alert.alert("Open profile", `View full vendor profile for ${vendor.name}.`);
  };

  return (
    <Pressable style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.heroCopy}>
              <Text style={styles.eyebrow}>Vendor Control Center</Text>
              <Text style={styles.title}>Advanced Vendors Management</Text>
              <Text style={styles.subtitle}>
                Monitor onboarding, trust signals, response health, and revenue
                from one admin view.
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.85}
              style={styles.addButton}
              onPress={handleAddVendor}
            >
              <Ionicons name="add" size={18} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Add Vendor</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.highlightStrip}>
            <View style={styles.highlightItem}>
              <Ionicons
                name="shield-checkmark-outline"
                size={18}
                color="#0F766E"
              />
              <Text style={styles.highlightLabel}>Compliance Ready</Text>
              <Text style={styles.highlightValue}>
                {
                  VENDORS.filter((vendor) => vendor.verification === "Verified")
                    .length
                }
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Ionicons name="time-outline" size={18} color="#B45309" />
              <Text style={styles.highlightLabel}>Awaiting Review</Text>
              <Text style={styles.highlightValue}>
                {dashboardStats.pendingReview}
              </Text>
            </View>
            <View style={styles.highlightItem}>
              <Ionicons name="trending-up-outline" size={18} color="#1D4ED8" />
              <Text style={styles.highlightLabel}>Avg Rating</Text>
              <Text style={styles.highlightValue}>
                {dashboardStats.avgRating}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Visible Vendors</Text>
            <Text style={styles.statValue}>{filteredVendors.length}</Text>
            <Text style={styles.statHint}>Filtered directory count</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Active Vendors</Text>
            <Text style={styles.statValue}>{dashboardStats.activeVendors}</Text>
            <Text style={styles.statHint}>Live and order-ready</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Managed Revenue</Text>
            <Text style={styles.statValueCompact}>
              {currencyFormatter.format(dashboardStats.totalRevenue)}
            </Text>
            <Text style={styles.statHint}>Across selected vendors</Text>
          </View>
        </View>

        <View style={styles.toolbarCard}>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={18} color="#64748B" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search by vendor, owner, city, or ID"
              placeholderTextColor="#94A3B8"
              style={styles.searchInput}
            />
            {searchQuery.length > 0 ? (
              <TouchableOpacity onPress={() => setSearchQuery("")}>
                <Ionicons name="close-circle" size={18} color="#94A3B8" />
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.filtersSection}>
            <Text style={styles.filterTitle}>Status</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {STATUS_FILTERS.map((status) => {
                const active = selectedStatus === status;

                return (
                  <TouchableOpacity
                    key={status}
                    activeOpacity={0.85}
                    onPress={() => setSelectedStatus(status)}
                    style={[
                      styles.filterChip,
                      active && styles.filterChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        active && styles.filterChipTextActive,
                      ]}
                    >
                      {status}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.filtersSection}>
            <Text style={styles.filterTitle}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {CATEGORY_FILTERS.map((category) => {
                const active = selectedCategory === category;

                return (
                  <TouchableOpacity
                    key={category}
                    activeOpacity={0.85}
                    onPress={() => setSelectedCategory(category)}
                    style={[
                      styles.filterChip,
                      active && styles.filterChipActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        active && styles.filterChipTextActive,
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>

        {topVendor ? (
          <View style={styles.spotlightCard}>
            <View style={styles.spotlightHeader}>
              <View>
                <Text style={styles.sectionTitle}>Top Performing Vendor</Text>
                <Text style={styles.sectionSubtitle}>
                  Highest revenue in the current filtered result set.
                </Text>
              </View>
              <StatusPill label={topVendor.status} tone="green" />
            </View>

            <View style={styles.spotlightBody}>
              <View style={styles.spotlightMain}>
                <Text style={styles.spotlightName}>{topVendor.name}</Text>
                <Text style={styles.spotlightMeta}>
                  {topVendor.owner} - {topVendor.city} - {topVendor.category}
                </Text>
              </View>
              <View style={styles.spotlightMetrics}>
                <View style={styles.miniMetric}>
                  <Text style={styles.miniMetricLabel}>Revenue</Text>
                  <Text style={styles.miniMetricValue}>
                    {currencyFormatter.format(topVendor.revenue)}
                  </Text>
                </View>
                <View style={styles.miniMetric}>
                  <Text style={styles.miniMetricLabel}>Orders</Text>
                  <Text style={styles.miniMetricValue}>{topVendor.orders}</Text>
                </View>
                <View style={styles.miniMetric}>
                  <Text style={styles.miniMetricLabel}>Response</Text>
                  <Text style={styles.miniMetricValue}>
                    {topVendor.responseTime}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : null}

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Vendor Directory</Text>
            <Text style={styles.sectionSubtitle}>
              Review status, verification, and business health vendor by vendor.
            </Text>
          </View>
        </View>

        <View style={styles.vendorList}>
          {filteredVendors.length > 0 ? (
            filteredVendors.map((vendor) => {
              const statusTone =
                vendor.status === "Active"
                  ? "green"
                  : vendor.status === "Pending"
                    ? "amber"
                    : "red";
              const verificationTone =
                vendor.verification === "Verified"
                  ? "blue"
                  : vendor.verification === "Under Review"
                    ? "amber"
                    : "red";

              return (
                <View key={vendor.id} style={styles.vendorCard}>
                  <View style={styles.vendorHeader}>
                    <View style={styles.vendorIdentity}>
                      <View style={styles.vendorAvatar}>
                        <Ionicons
                          name="business-outline"
                          size={22}
                          color="#1D4ED8"
                        />
                      </View>
                      <View style={styles.vendorTitleWrap}>
                        <Text style={styles.vendorName}>{vendor.name}</Text>
                        <Text style={styles.vendorSubtext}>
                          {vendor.id} - {vendor.owner}
                        </Text>
                      </View>
                    </View>

                    <View style={styles.vendorBadges}>
                      <StatusPill label={vendor.status} tone={statusTone} />
                      <StatusPill
                        label={vendor.verification}
                        tone={verificationTone}
                      />
                    </View>
                  </View>

                  <View style={styles.vendorInfoGrid}>
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Category</Text>
                      <Text style={styles.infoValue}>{vendor.category}</Text>
                    </View>
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>City</Text>
                      <Text style={styles.infoValue}>{vendor.city}</Text>
                    </View>
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Rating</Text>
                      <Text style={styles.infoValue}>{vendor.rating}/5</Text>
                    </View>
                    <View style={styles.infoBlock}>
                      <Text style={styles.infoLabel}>Joined</Text>
                      <Text style={styles.infoValue}>{vendor.joinedOn}</Text>
                    </View>
                  </View>

                  <View style={styles.performanceRow}>
                    <View style={styles.performanceCard}>
                      <Text style={styles.performanceLabel}>Orders</Text>
                      <Text style={styles.performanceValue}>
                        {vendor.orders}
                      </Text>
                    </View>
                    <View style={styles.performanceCard}>
                      <Text style={styles.performanceLabel}>Revenue</Text>
                      <Text style={styles.performanceValueSmall}>
                        {currencyFormatter.format(vendor.revenue)}
                      </Text>
                    </View>
                    <View style={styles.performanceCard}>
                      <Text style={styles.performanceLabel}>Response</Text>
                      <Text style={styles.performanceValue}>
                        {vendor.responseTime}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.actionRow}>
                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.secondaryAction}
                      onPress={() =>
                        Alert.alert(
                          "Message vendor",
                          `Start support conversation with ${vendor.name}.`,
                        )
                      }
                    >
                      <Ionicons
                        name="chatbubble-ellipses-outline"
                        size={16}
                        color="#1E40AF"
                      />
                      <Text style={styles.secondaryActionText}>Message</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.85}
                      style={styles.primaryAction}
                      onPress={() => handlePrimaryAction(vendor)}
                    >
                      <Text style={styles.primaryActionText}>
                        {vendor.status === "Pending"
                          ? "Review"
                          : vendor.status === "Suspended"
                            ? "Resolve"
                            : "Open Profile"}
                      </Text>
                      <Ionicons
                        name="arrow-forward"
                        size={16}
                        color="#FFFFFF"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={42} color="#94A3B8" />
              <Text style={styles.emptyTitle}>
                No vendors match these filters
              </Text>
              <Text style={styles.emptyText}>
                Try another status, category, or search keyword to widen the
                list.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEF4FF",
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 28,
  },
  heroCard: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
  },
  heroHeader: {
    gap: 16,
  },
  heroCopy: {
    gap: 8,
  },
  eyebrow: {
    color: "#93C5FD",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
  },
  addButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2563EB",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },
  highlightStrip: {
    marginTop: 18,
    backgroundColor: "#172554",
    borderRadius: 18,
    padding: 14,
    gap: 12,
  },
  highlightItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  highlightLabel: {
    flex: 1,
    marginLeft: 10,
    color: "#DBEAFE",
    fontSize: 14,
  },
  highlightValue: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  statsRow: {
    gap: 12,
    marginBottom: 16,
  },
  statCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 2,
  },
  statLabel: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "600",
  },
  statValue: {
    color: "#0F172A",
    fontSize: 30,
    fontWeight: "800",
    marginTop: 10,
  },
  statValueCompact: {
    color: "#0F172A",
    fontSize: 24,
    fontWeight: "800",
    marginTop: 10,
  },
  statHint: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 6,
  },
  toolbarCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 2,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: "#0F172A",
    fontSize: 15,
    paddingVertical: 12,
    marginLeft: 8,
  },
  filtersSection: {
    marginBottom: 14,
  },
  filterTitle: {
    color: "#334155",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 10,
  },
  filterChip: {
    backgroundColor: "#EFF6FF",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: "#1D4ED8",
  },
  filterChipText: {
    color: "#1E3A8A",
    fontSize: 13,
    fontWeight: "600",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  spotlightCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 2,
  },
  spotlightHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
  spotlightBody: {
    marginTop: 16,
    gap: 16,
  },
  spotlightMain: {
    gap: 4,
  },
  spotlightName: {
    color: "#0F172A",
    fontSize: 22,
    fontWeight: "800",
  },
  spotlightMeta: {
    color: "#64748B",
    fontSize: 14,
  },
  spotlightMetrics: {
    gap: 10,
  },
  miniMetric: {
    backgroundColor: "#F8FAFC",
    borderRadius: 14,
    padding: 14,
  },
  miniMetricLabel: {
    color: "#64748B",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  miniMetricValue: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "800",
    marginTop: 6,
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#0F172A",
    fontSize: 20,
    fontWeight: "800",
  },
  sectionSubtitle: {
    color: "#64748B",
    fontSize: 14,
    marginTop: 4,
    lineHeight: 20,
  },
  vendorList: {
    gap: 14,
  },
  vendorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    elevation: 2,
  },
  vendorHeader: {
    gap: 12,
  },
  vendorIdentity: {
    flexDirection: "row",
    alignItems: "center",
  },
  vendorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#DBEAFE",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  vendorTitleWrap: {
    flex: 1,
  },
  vendorName: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "800",
  },
  vendorSubtext: {
    color: "#64748B",
    fontSize: 13,
    marginTop: 4,
  },
  vendorBadges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  pillGreen: {
    backgroundColor: "#DCFCE7",
  },
  pillAmber: {
    backgroundColor: "#FEF3C7",
  },
  pillRed: {
    backgroundColor: "#FEE2E2",
  },
  pillBlue: {
    backgroundColor: "#DBEAFE",
  },
  pillText: {
    fontSize: 12,
    fontWeight: "700",
  },
  pillTextGreen: {
    color: "#166534",
  },
  pillTextAmber: {
    color: "#92400E",
  },
  pillTextRed: {
    color: "#B91C1C",
  },
  pillTextBlue: {
    color: "#1D4ED8",
  },
  vendorInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
    marginHorizontal: -6,
  },
  infoBlock: {
    width: "50%",
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  infoLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 4,
  },
  infoValue: {
    color: "#0F172A",
    fontSize: 15,
    fontWeight: "600",
  },
  performanceRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
    marginTop: 4,
    marginBottom: 16,
  },
  performanceCard: {
    width: "33.33%",
    paddingHorizontal: 5,
  },
  performanceLabel: {
    color: "#64748B",
    fontSize: 12,
    marginBottom: 6,
  },
  performanceValue: {
    backgroundColor: "#F8FAFC",
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "800",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 12,
    textAlign: "center",
  },
  performanceValueSmall: {
    backgroundColor: "#F8FAFC",
    color: "#0F172A",
    fontSize: 14,
    fontWeight: "800",
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 8,
    textAlign: "center",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
  },
  secondaryAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    borderRadius: 14,
    paddingVertical: 12,
    backgroundColor: "#EFF6FF",
  },
  secondaryActionText: {
    color: "#1E40AF",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },
  primaryAction: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    paddingVertical: 12,
    backgroundColor: "#1D4ED8",
  },
  primaryActionText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
    marginRight: 8,
  },
  emptyState: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 28,
    alignItems: "center",
  },
  emptyTitle: {
    color: "#0F172A",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 14,
  },
  emptyText: {
    color: "#64748B",
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    marginTop: 8,
  },
});
