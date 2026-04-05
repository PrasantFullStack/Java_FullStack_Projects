import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type PaymentStatus = "Paid" | "Unpaid";
type DeliveryStatus = "Delivered" | "Pending" | "Cancelled";
type TabKey = "All Orders" | "Pending" | "Delivered" | "Cancelled";
type FilterKey = "All Payments" | PaymentStatus;

type Order = {
  id: string;
  customerName: string;
  vendorName: string;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  deliveryStatus: DeliveryStatus;
};

const ORDERS: Order[] = [
  {
    id: "ORD-1048",
    customerName: "Aarav Mehta",
    vendorName: "Urban Cement Co.",
    totalAmount: 28450,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
  },
  {
    id: "ORD-1049",
    customerName: "Priya Sharma",
    vendorName: "Steel Frame Depot",
    totalAmount: 56120,
    paymentStatus: "Unpaid",
    deliveryStatus: "Pending",
  },
  {
    id: "ORD-1050",
    customerName: "Kabir Verma",
    vendorName: "BuildPro Supplies",
    totalAmount: 17990,
    paymentStatus: "Paid",
    deliveryStatus: "Pending",
  },
  {
    id: "ORD-1051",
    customerName: "Ananya Rao",
    vendorName: "Prime Bricks",
    totalAmount: 42175,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
  },
  {
    id: "ORD-1052",
    customerName: "Rahul Nair",
    vendorName: "Northline Hardware",
    totalAmount: 31800,
    paymentStatus: "Unpaid",
    deliveryStatus: "Cancelled",
  },
  {
    id: "ORD-1053",
    customerName: "Ishita Kapoor",
    vendorName: "Concrete Masters",
    totalAmount: 23740,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
  },
  {
    id: "ORD-1054",
    customerName: "Rohan Singh",
    vendorName: "Mason Hub",
    totalAmount: 14960,
    paymentStatus: "Unpaid",
    deliveryStatus: "Pending",
  },
  {
    id: "ORD-1055",
    customerName: "Sana Khan",
    vendorName: "Elite Aggregates",
    totalAmount: 60200,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
  },
  {
    id: "ORD-1056",
    customerName: "Aditya Jain",
    vendorName: "BrickBarn Vendors",
    totalAmount: 27480,
    paymentStatus: "Paid",
    deliveryStatus: "Pending",
  },
  {
    id: "ORD-1057",
    customerName: "Neha Patel",
    vendorName: "Metro Tiles",
    totalAmount: 33890,
    paymentStatus: "Unpaid",
    deliveryStatus: "Cancelled",
  },
  {
    id: "ORD-1058",
    customerName: "Vikram Das",
    vendorName: "Rapid Scaffold",
    totalAmount: 48770,
    paymentStatus: "Paid",
    deliveryStatus: "Delivered",
  },
  {
    id: "ORD-1059",
    customerName: "Meera Iyer",
    vendorName: "Golden Sand Traders",
    totalAmount: 19320,
    paymentStatus: "Unpaid",
    deliveryStatus: "Pending",
  },
];

const TABS: TabKey[] = ["All Orders", "Pending", "Delivered", "Cancelled"];
const FILTERS: FilterKey[] = ["All Payments", "Paid", "Unpaid"];
const ITEMS_PER_PAGE = 6;

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function StatusBadge({
  label,
  type,
}: {
  label: string;
  type: "success" | "warning" | "danger";
}) {
  return (
    <View
      style={[
        styles.badge,
        type === "success" && styles.badgeSuccess,
        type === "warning" && styles.badgeWarning,
        type === "danger" && styles.badgeDanger,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          type === "success" && styles.badgeTextSuccess,
          type === "warning" && styles.badgeTextWarning,
          type === "danger" && styles.badgeTextDanger,
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

function OrderRow({ order }: { order: Order }) {
  const deliveryBadgeType =
    order.deliveryStatus === "Delivered"
      ? "success"
      : order.deliveryStatus === "Pending"
        ? "warning"
        : "danger";

  return (
    <View style={styles.row}>
      <View style={[styles.cell, styles.idColumn]}>
        <Text style={styles.orderId}>{order.id}</Text>
      </View>
      <View style={[styles.cell, styles.customerColumn]}>
        <Text style={styles.primaryCellText}>{order.customerName}</Text>
      </View>
      <View style={[styles.cell, styles.vendorColumn]}>
        <Text style={styles.secondaryCellText}>{order.vendorName}</Text>
      </View>
      <View style={[styles.cell, styles.amountColumn]}>
        <Text style={styles.amountText}>
          {currencyFormatter.format(order.totalAmount)}
        </Text>
      </View>
      <View style={[styles.cell, styles.paymentColumn]}>
        <StatusBadge
          label={order.paymentStatus}
          type={order.paymentStatus === "Paid" ? "success" : "danger"}
        />
      </View>
      <View style={[styles.cell, styles.deliveryColumn]}>
        <StatusBadge label={order.deliveryStatus} type={deliveryBadgeType} />
      </View>
    </View>
  );
}

export default function Orders() {
  const [activeTab, setActiveTab] = useState<TabKey>("All Orders");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<FilterKey>("All Payments");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredOrders = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return ORDERS.filter((order) => {
      const matchesTab =
        activeTab === "All Orders" || order.deliveryStatus === activeTab;
      const matchesFilter =
        selectedFilter === "All Payments" ||
        order.paymentStatus === selectedFilter;
      const matchesSearch =
        normalizedQuery.length === 0 ||
        order.id.toLowerCase().includes(normalizedQuery) ||
        order.customerName.toLowerCase().includes(normalizedQuery) ||
        order.vendorName.toLowerCase().includes(normalizedQuery);

      return matchesTab && matchesFilter && matchesSearch;
    });
  }, [activeTab, searchQuery, selectedFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ITEMS_PER_PAGE),
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, selectedFilter]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const pageStart = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(
    pageStart,
    pageStart + ITEMS_PER_PAGE,
  );

  return (
    <Pressable style={styles.container} onPress={() => setFilterOpen(false)}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Orders Management</Text>
          <Text style={styles.subtitle}>
            Track every order, payment, and delivery update in one place.
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Total Orders</Text>
          <Text style={styles.summaryValue}>{filteredOrders.length}</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsContainer}
      >
        {TABS.map((tab) => {
          const active = activeTab === tab;

          return (
            <TouchableOpacity
              key={tab}
              activeOpacity={0.85}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, active && styles.tabActive]}
            >
              <Text style={[styles.tabText, active && styles.tabTextActive]}>
                {tab}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.toolbar}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#64748B" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by order ID, customer, or vendor"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.filterWrapper}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setFilterOpen((open) => !open)}
            style={styles.filterTrigger}
          >
            <Ionicons name="options-outline" size={18} color="#1E3A8A" />
            <Text style={styles.filterTriggerText}>{selectedFilter}</Text>
            <Ionicons
              name={filterOpen ? "chevron-up" : "chevron-down"}
              size={16}
              color="#1E3A8A"
            />
          </TouchableOpacity>

          {filterOpen ? (
            <View style={styles.dropdownMenu}>
              {FILTERS.map((filter) => {
                const selected = selectedFilter === filter;

                return (
                  <TouchableOpacity
                    key={filter}
                    activeOpacity={0.85}
                    onPress={() => {
                      setSelectedFilter(filter);
                      setFilterOpen(false);
                    }}
                    style={[
                      styles.dropdownItem,
                      selected && styles.dropdownItemSelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.dropdownItemText,
                        selected && styles.dropdownItemTextSelected,
                      ]}
                    >
                      {filter}
                    </Text>
                    {selected ? (
                      <Ionicons
                        name="checkmark"
                        size={16}
                        color="#1D4ED8"
                      />
                    ) : null}
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
      </View>

      <View style={styles.tableCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={[styles.headerCell, styles.idColumn]}>
                <Text style={styles.headerCellText}>Order ID</Text>
              </View>
              <View style={[styles.headerCell, styles.customerColumn]}>
                <Text style={styles.headerCellText}>Customer Name</Text>
              </View>
              <View style={[styles.headerCell, styles.vendorColumn]}>
                <Text style={styles.headerCellText}>Vendor Name</Text>
              </View>
              <View style={[styles.headerCell, styles.amountColumn]}>
                <Text style={styles.headerCellText}>Total Amount</Text>
              </View>
              <View style={[styles.headerCell, styles.paymentColumn]}>
                <Text style={styles.headerCellText}>Payment Status</Text>
              </View>
              <View style={[styles.headerCell, styles.deliveryColumn]}>
                <Text style={styles.headerCellText}>Delivery Status</Text>
              </View>
            </View>

            <FlatList
              data={paginatedOrders}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <OrderRow order={item} />}
              showsVerticalScrollIndicator={false}
              style={styles.list}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Ionicons
                    name="receipt-outline"
                    size={28}
                    color="#94A3B8"
                  />
                  <Text style={styles.emptyTitle}>No orders found</Text>
                  <Text style={styles.emptyText}>
                    Try changing the tab, search, or payment filter.
                  </Text>
                </View>
              }
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.pagination}>
        <Text style={styles.paginationText}>
          Showing {filteredOrders.length === 0 ? 0 : pageStart + 1}-
          {Math.min(pageStart + ITEMS_PER_PAGE, filteredOrders.length)} of{" "}
          {filteredOrders.length}
        </Text>

        <View style={styles.paginationControls}>
          <TouchableOpacity
            activeOpacity={0.85}
            disabled={currentPage === 1}
            onPress={() => setCurrentPage((page) => Math.max(1, page - 1))}
            style={[
              styles.paginationButton,
              currentPage === 1 && styles.paginationButtonDisabled,
            ]}
          >
            <Ionicons name="chevron-back" size={18} color="#1E3A8A" />
          </TouchableOpacity>

          <Text style={styles.pageIndicator}>
            {currentPage} / {totalPages}
          </Text>

          <TouchableOpacity
            activeOpacity={0.85}
            disabled={currentPage === totalPages || filteredOrders.length === 0}
            onPress={() =>
              setCurrentPage((page) => Math.min(totalPages, page + 1))
            }
            style={[
              styles.paginationButton,
              (currentPage === totalPages || filteredOrders.length === 0) &&
                styles.paginationButtonDisabled,
            ]}
          >
            <Ionicons name="chevron-forward" size={18} color="#1E3A8A" />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F6FB",
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#0F172A",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
    maxWidth: 280,
  },
  summaryCard: {
    minWidth: 110,
    backgroundColor: "#EFF6FF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "flex-start",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#1D4ED8",
    marginBottom: 4,
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1E3A8A",
  },
  tabsContainer: {
    paddingBottom: 14,
    gap: 10,
  },
  tab: {
    backgroundColor: "#E2E8F0",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginRight: 10,
  },
  tabActive: {
    backgroundColor: "#1D4ED8",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
  },
  tabTextActive: {
    color: "#FFFFFF",
  },
  toolbar: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 14,
    zIndex: 20,
  },
  searchBox: {
    flex: 1,
    minHeight: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#0F172A",
    paddingVertical: 14,
  },
  filterWrapper: {
    width: 170,
    position: "relative",
  },
  filterTrigger: {
    minHeight: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  filterTriggerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#1E3A8A",
  },
  dropdownMenu: {
    position: "absolute",
    top: 58,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    paddingVertical: 8,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 8,
    zIndex: 30,
  },
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dropdownItemSelected: {
    backgroundColor: "#EFF6FF",
  },
  dropdownItemText: {
    fontSize: 14,
    color: "#334155",
  },
  dropdownItemTextSelected: {
    color: "#1D4ED8",
    fontWeight: "600",
  },
  tableCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  table: {
    minWidth: 860,
    flex: 1,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F8FAFC",
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  headerCell: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: "center",
  },
  headerCellText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.3,
  },
  list: {
    flexGrow: 0,
  },
  row: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEF2F7",
  },
  cell: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    justifyContent: "center",
  },
  idColumn: {
    width: 120,
  },
  customerColumn: {
    width: 170,
  },
  vendorColumn: {
    width: 180,
  },
  amountColumn: {
    width: 140,
  },
  paymentColumn: {
    width: 120,
  },
  deliveryColumn: {
    width: 130,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  primaryCellText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  secondaryCellText: {
    fontSize: 14,
    color: "#475569",
  },
  amountText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#059669",
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
  },
  badgeSuccess: {
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
  },
  badgeWarning: {
    backgroundColor: "#FEFCE8",
    borderColor: "#FDE68A",
  },
  badgeDanger: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  badgeTextSuccess: {
    color: "#047857",
  },
  badgeTextWarning: {
    color: "#B45309",
  },
  badgeTextDanger: {
    color: "#B91C1C",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 42,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    marginTop: 12,
    fontSize: 16,
    fontWeight: "700",
    color: "#334155",
  },
  emptyText: {
    marginTop: 6,
    fontSize: 14,
    lineHeight: 20,
    color: "#64748B",
    textAlign: "center",
  },
  pagination: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  paginationText: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "500",
  },
  paginationControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  paginationButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EFF6FF",
    alignItems: "center",
    justifyContent: "center",
  },
  paginationButtonDisabled: {
    opacity: 0.45,
  },
  pageIndicator: {
    minWidth: 46,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "#1E3A8A",
  },
});
