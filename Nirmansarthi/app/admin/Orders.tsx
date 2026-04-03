import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// Mock data for orders
const mockOrders = [
  {
    id: "ORD001",
    customerName: "John Doe",
    vendor: "ABC Construction",
    totalAmount: 25000,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
    orderDate: "2024-01-15",
  },
  {
    id: "ORD002",
    customerName: "Jane Smith",
    vendor: "XYZ Builders",
    totalAmount: 45000,
    paymentStatus: "Unpaid",
    deliveryStatus: "Pending",
    orderDate: "2024-01-14",
  },
  {
    id: "ORD003",
    customerName: "Mike Johnson",
    vendor: "BuildPro Ltd",
    totalAmount: 18000,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
    orderDate: "2024-01-13",
  },
  {
    id: "ORD004",
    customerName: "Sarah Wilson",
    vendor: "ConstructCo",
    totalAmount: 32000,
    paymentStatus: "Paid",
    deliveryStatus: "Pending",
    orderDate: "2024-01-12",
  },
  {
    id: "ORD005",
    customerName: "David Brown",
    vendor: "Elite Builders",
    totalAmount: 55000,
    paymentStatus: "Unpaid",
    deliveryStatus: "Cancelled",
    orderDate: "2024-01-11",
  },
  // Add more mock data
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `ORD${String(i + 6).padStart(3, "0")}`,
    customerName: `Customer ${i + 6}`,
    vendor: `Vendor ${i + 6}`,
    totalAmount: Math.floor(Math.random() * 50000) + 10000,
    paymentStatus: Math.random() > 0.5 ? "Paid" : "Unpaid",
    deliveryStatus: ["Delivered", "Pending", "Cancelled"][
      Math.floor(Math.random() * 3)
    ],
    orderDate: `2024-01-${String(10 - i).padStart(2, "0")}`,
  })),
];

const tabs = ["All Orders", "Pending Orders", "Delivered", "Cancelled"];
const filters = ["All", "Paid", "Unpaid"];

function OrderRow({ order }: { order: (typeof mockOrders)[0] }) {
  return (
    <View style={styles.orderRow}>
      <View style={styles.orderCell}>
        <Text style={styles.orderId}>{order.id}</Text>
      </View>
      <View style={styles.orderCell}>
        <Text style={styles.customerName}>{order.customerName}</Text>
      </View>
      <View style={styles.orderCell}>
        <Text style={styles.vendor}>{order.vendor}</Text>
      </View>
      <View style={styles.orderCell}>
        <Text style={styles.amount}>₹{order.totalAmount.toLocaleString()}</Text>
      </View>
      <View style={styles.orderCell}>
        <View
          style={[
            styles.statusBadge,
            order.paymentStatus === "Paid"
              ? styles.paidBadge
              : styles.unpaidBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              order.paymentStatus === "Paid"
                ? styles.paidText
                : styles.unpaidText,
            ]}
          >
            {order.paymentStatus}
          </Text>
        </View>
      </View>
      <View style={styles.orderCell}>
        <View
          style={[
            styles.statusBadge,
            order.deliveryStatus === "Delivered"
              ? styles.deliveredBadge
              : order.deliveryStatus === "Pending"
                ? styles.pendingBadge
                : styles.cancelledBadge,
          ]}
        >
          <Text
            style={[
              styles.statusText,
              order.deliveryStatus === "Delivered"
                ? styles.deliveredText
                : order.deliveryStatus === "Pending"
                  ? styles.pendingText
                  : styles.cancelledText,
            ]}
          >
            {order.deliveryStatus}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = useMemo(() => {
    let filtered = mockOrders;

    // Filter by tab
    if (activeTab !== "All Orders") {
      const statusMap = {
        "Pending Orders": "Pending",
        Delivered: "Delivered",
        Cancelled: "Cancelled",
      };
      filtered = filtered.filter(
        (order) =>
          order.deliveryStatus ===
          statusMap[activeTab as keyof typeof statusMap],
      );
    }

    // Filter by payment status
    if (selectedFilter !== "All") {
      filtered = filtered.filter(
        (order) => order.paymentStatus === selectedFilter,
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (order) =>
          order.customerName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          order.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.id.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    return filtered;
  }, [activeTab, searchQuery, selectedFilter]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Orders</Text>
    </View>
  );

  const renderTabs = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.tabsContainer}
    >
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => {
            setActiveTab(tab);
            setCurrentPage(1);
          }}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderSearchAndFilter = () => (
    <View style={styles.searchFilterContainer}>
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search orders..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter:</Text>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.activeFilterButton,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === filter && styles.activeFilterText,
              ]}
            >
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={styles.tableHeaderText}>Order ID</Text>
      <Text style={styles.tableHeaderText}>Customer</Text>
      <Text style={styles.tableHeaderText}>Vendor</Text>
      <Text style={styles.tableHeaderText}>Amount</Text>
      <Text style={styles.tableHeaderText}>Payment</Text>
      <Text style={styles.tableHeaderText}>Status</Text>
    </View>
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage === 1 && styles.disabledPageButton,
        ]}
        onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        <Ionicons
          name="chevron-back"
          size={20}
          color={currentPage === 1 ? "#CCC" : "#2F5BEA"}
        />
      </TouchableOpacity>

      <Text style={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </Text>

      <TouchableOpacity
        style={[
          styles.pageButton,
          currentPage === totalPages && styles.disabledPageButton,
        ]}
        onPress={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        <Ionicons
          name="chevron-forward"
          size={20}
          color={currentPage === totalPages ? "#CCC" : "#2F5BEA"}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderTabs()}
      {renderSearchAndFilter()}

      <View style={styles.tableContainer}>
        {renderTableHeader()}
        <FlatList
          data={paginatedOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderRow order={item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.ordersList}
        />
      </View>

      {renderPagination()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  header: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
  },
  tabsContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
  },
  activeTab: {
    backgroundColor: "#2F5BEA",
  },
  tabText: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  searchFilterContainer: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333333",
    marginRight: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: "#2F5BEA",
  },
  filterText: {
    fontSize: 14,
    color: "#666666",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  tableContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    margin: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableHeader: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    textAlign: "center",
  },
  ordersList: {
    paddingBottom: 16,
  },
  orderRow: {
    flexDirection: "row",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  orderCell: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  orderId: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2F5BEA",
  },
  customerName: {
    fontSize: 14,
    color: "#333333",
  },
  vendor: {
    fontSize: 14,
    color: "#666666",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#059669",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minWidth: 70,
    alignItems: "center",
  },
  paidBadge: {
    backgroundColor: "#D1FAE5",
  },
  unpaidBadge: {
    backgroundColor: "#FEE2E2",
  },
  deliveredBadge: {
    backgroundColor: "#D1FAE5",
  },
  pendingBadge: {
    backgroundColor: "#FEF3C7",
  },
  cancelledBadge: {
    backgroundColor: "#FEE2E2",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  paidText: {
    color: "#059669",
  },
  unpaidText: {
    color: "#DC2626",
  },
  deliveredText: {
    color: "#059669",
  },
  pendingText: {
    color: "#D97706",
  },
  cancelledText: {
    color: "#DC2626",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  pageButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F3F4F6",
    marginHorizontal: 8,
  },
  disabledPageButton: {
    backgroundColor: "#F9FAFB",
  },
  pageInfo: {
    fontSize: 14,
    color: "#666666",
    marginHorizontal: 16,
  },
});
