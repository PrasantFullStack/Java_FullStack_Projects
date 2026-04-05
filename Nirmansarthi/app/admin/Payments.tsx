import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type PaymentStatus = "Paid" | "Unpaid";
type PaymentFilter = "All" | PaymentStatus;

type Transaction = {
  id: string;
  orderId: string;
  amount: number;
  paymentMethod: string;
  status: PaymentStatus;
};

const TRANSACTIONS: Transaction[] = [
  {
    id: "TXN-9001",
    orderId: "ORD-1048",
    amount: 28450,
    paymentMethod: "UPI",
    status: "Paid",
  },
  {
    id: "TXN-9002",
    orderId: "ORD-1049",
    amount: 56120,
    paymentMethod: "Bank Transfer",
    status: "Unpaid",
  },
  {
    id: "TXN-9003",
    orderId: "ORD-1050",
    amount: 17990,
    paymentMethod: "Credit Card",
    status: "Paid",
  },
  {
    id: "TXN-9004",
    orderId: "ORD-1051",
    amount: 42175,
    paymentMethod: "Net Banking",
    status: "Paid",
  },
  {
    id: "TXN-9005",
    orderId: "ORD-1052",
    amount: 31800,
    paymentMethod: "Cash",
    status: "Unpaid",
  },
  {
    id: "TXN-9006",
    orderId: "ORD-1053",
    amount: 23740,
    paymentMethod: "UPI",
    status: "Paid",
  },
  {
    id: "TXN-9007",
    orderId: "ORD-1054",
    amount: 14960,
    paymentMethod: "Debit Card",
    status: "Unpaid",
  },
  {
    id: "TXN-9008",
    orderId: "ORD-1055",
    amount: 60200,
    paymentMethod: "Bank Transfer",
    status: "Paid",
  },
];

const FILTERS: PaymentFilter[] = ["All", "Paid", "Unpaid"];

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

function StatusBadge({ status }: { status: PaymentStatus }) {
  const isPaid = status === "Paid";

  return (
    <View
      style={[
        styles.badge,
        isPaid ? styles.badgeSuccess : styles.badgeDanger,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          isPaid ? styles.badgeTextSuccess : styles.badgeTextDanger,
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

function TransactionRow({ item }: { item: Transaction }) {
  return (
    <View style={styles.row}>
      <View style={[styles.cell, styles.orderColumn]}>
        <Text style={styles.orderId}>{item.orderId}</Text>
      </View>
      <View style={[styles.cell, styles.amountColumn]}>
        <Text style={styles.amount}>{currencyFormatter.format(item.amount)}</Text>
      </View>
      <View style={[styles.cell, styles.methodColumn]}>
        <Text style={styles.method}>{item.paymentMethod}</Text>
      </View>
      <View style={[styles.cell, styles.statusColumn]}>
        <StatusBadge status={item.status} />
      </View>
    </View>
  );
}

export default function Payments() {
  const [selectedFilter, setSelectedFilter] = useState<PaymentFilter>("All");
  const [filterOpen, setFilterOpen] = useState(false);

  const filteredTransactions = useMemo(() => {
    if (selectedFilter === "All") {
      return TRANSACTIONS;
    }

    return TRANSACTIONS.filter((transaction) => transaction.status === selectedFilter);
  }, [selectedFilter]);

  return (
    <Pressable style={styles.container} onPress={() => setFilterOpen(false)}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Payments</Text>
          <Text style={styles.subtitle}>
            Review transaction amounts, payment methods, and current status.
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Transactions</Text>
          <Text style={styles.summaryValue}>{filteredTransactions.length}</Text>
        </View>
      </View>

      <View style={styles.toolbar}>
        <View style={styles.filterWrapper}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setFilterOpen((open) => !open)}
            style={styles.filterTrigger}
          >
            <Ionicons name="funnel-outline" size={18} color="#1E3A8A" />
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
                      <Ionicons name="checkmark" size={16} color="#1D4ED8" />
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
              <View style={[styles.headerCell, styles.orderColumn]}>
                <Text style={styles.headerText}>Order ID</Text>
              </View>
              <View style={[styles.headerCell, styles.amountColumn]}>
                <Text style={styles.headerText}>Amount</Text>
              </View>
              <View style={[styles.headerCell, styles.methodColumn]}>
                <Text style={styles.headerText}>Payment Method</Text>
              </View>
              <View style={[styles.headerCell, styles.statusColumn]}>
                <Text style={styles.headerText}>Status</Text>
              </View>
            </View>

            <FlatList
              data={filteredTransactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionRow item={item} />}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Ionicons name="card-outline" size={28} color="#94A3B8" />
                  <Text style={styles.emptyTitle}>No transactions found</Text>
                  <Text style={styles.emptyText}>
                    Change the filter to view more payment records.
                  </Text>
                </View>
              }
            />
          </View>
        </ScrollView>
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
  toolbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 14,
    zIndex: 20,
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
    minWidth: 620,
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
  headerText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 0.3,
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
  orderColumn: {
    width: 150,
  },
  amountColumn: {
    width: 140,
  },
  methodColumn: {
    width: 190,
  },
  statusColumn: {
    width: 140,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  amount: {
    fontSize: 15,
    fontWeight: "700",
    color: "#059669",
  },
  method: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "600",
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
});
