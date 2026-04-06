import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DisputeStatus = "Open" | "Resolved";

type Dispute = {
  id: string;
  orderId: string;
  customerName: string;
  issueDescription: string;
  status: DisputeStatus;
};

const INITIAL_DISPUTES: Dispute[] = [
  {
    id: "DSP-301",
    orderId: "ORD-1049",
    customerName: "Priya Sharma",
    issueDescription: "Partial material delivery reported at site handoff.",
    status: "Open",
  },
  {
    id: "DSP-302",
    orderId: "ORD-1051",
    customerName: "Ananya Rao",
    issueDescription: "Invoice amount mismatch between quote and payment link.",
    status: "Resolved",
  },
  {
    id: "DSP-303",
    orderId: "ORD-1054",
    customerName: "Rohan Singh",
    issueDescription: "Damaged packaging received for safety equipment bundle.",
    status: "Open",
  },
  {
    id: "DSP-304",
    orderId: "ORD-1057",
    customerName: "Neha Patel",
    issueDescription: "Vendor delayed dispatch without updated delivery timeline.",
    status: "Open",
  },
  {
    id: "DSP-305",
    orderId: "ORD-1058",
    customerName: "Vikram Das",
    issueDescription: "Replacement request closed after revised batch was delivered.",
    status: "Resolved",
  },
];

function StatusBadge({ status }: { status: DisputeStatus }) {
  const isOpen = status === "Open";

  return (
    <View
      style={[
        styles.badge,
        isOpen ? styles.openBadge : styles.resolvedBadge,
      ]}
    >
      <Text
        style={[
          styles.badgeText,
          isOpen ? styles.openBadgeText : styles.resolvedBadgeText,
        ]}
      >
        {status}
      </Text>
    </View>
  );
}

function DisputeRow({
  dispute,
  onResolve,
}: {
  dispute: Dispute;
  onResolve: (id: string) => void;
}) {
  const isOpen = dispute.status === "Open";

  return (
    <View style={[styles.row, isOpen && styles.pendingRow]}>
      <View style={[styles.cell, styles.orderColumn]}>
        <Text style={styles.orderId}>{dispute.orderId}</Text>
      </View>
      <View style={[styles.cell, styles.customerColumn]}>
        <Text style={styles.customerName}>{dispute.customerName}</Text>
      </View>
      <View style={[styles.cell, styles.issueColumn]}>
        <Text style={styles.issueText}>{dispute.issueDescription}</Text>
      </View>
      <View style={[styles.cell, styles.statusColumn]}>
        <StatusBadge status={dispute.status} />
      </View>
      <View style={[styles.cell, styles.actionColumn]}>
        <TouchableOpacity
          activeOpacity={0.85}
          disabled={!isOpen}
          onPress={() => onResolve(dispute.id)}
          style={[
            styles.resolveButton,
            !isOpen && styles.resolveButtonDisabled,
          ]}
        >
          <Ionicons
            name={isOpen ? "checkmark-done-outline" : "checkmark-circle-outline"}
            size={16}
            color={isOpen ? "#0F766E" : "#64748B"}
          />
          <Text
            style={[
              styles.resolveButtonText,
              !isOpen && styles.resolveButtonTextDisabled,
            ]}
          >
            {isOpen ? "Resolve" : "Resolved"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function Disputes() {
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);

  const openCount = useMemo(
    () => disputes.filter((dispute) => dispute.status === "Open").length,
    [disputes],
  );

  const handleResolve = (id: string) => {
    setDisputes((current) =>
      current.map((dispute) =>
        dispute.id === id ? { ...dispute, status: "Resolved" } : dispute,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Disputes Management</Text>
          <Text style={styles.subtitle}>
            Review customer issues quickly and close pending order disputes.
          </Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Open Disputes</Text>
          <Text style={styles.summaryValue}>{openCount}</Text>
        </View>
      </View>

      <View style={styles.noticeCard}>
        <Ionicons name="alert-circle-outline" size={18} color="#C2410C" />
        <Text style={styles.noticeText}>
          Open disputes are highlighted so pending cases stand out immediately.
        </Text>
      </View>

      <View style={styles.tableCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={[styles.headerCell, styles.orderColumn]}>
                <Text style={styles.headerText}>Order ID</Text>
              </View>
              <View style={[styles.headerCell, styles.customerColumn]}>
                <Text style={styles.headerText}>Customer Name</Text>
              </View>
              <View style={[styles.headerCell, styles.issueColumn]}>
                <Text style={styles.headerText}>Issue Description</Text>
              </View>
              <View style={[styles.headerCell, styles.statusColumn]}>
                <Text style={styles.headerText}>Status</Text>
              </View>
              <View style={[styles.headerCell, styles.actionColumn]}>
                <Text style={styles.headerText}>Action</Text>
              </View>
            </View>

            <FlatList
              data={disputes}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <DisputeRow dispute={item} onResolve={handleResolve} />
              )}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Ionicons name="shield-checkmark-outline" size={28} color="#94A3B8" />
                  <Text style={styles.emptyTitle}>No disputes available</Text>
                  <Text style={styles.emptyText}>
                    Incoming dispute cases will appear here for review.
                  </Text>
                </View>
              }
            />
          </View>
        </ScrollView>
      </View>
    </View>
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
    maxWidth: 290,
  },
  summaryCard: {
    minWidth: 120,
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: "flex-start",
  },
  summaryLabel: {
    fontSize: 12,
    color: "#C2410C",
    marginBottom: 4,
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#9A3412",
  },
  noticeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFF7ED",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#FED7AA",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  noticeText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: "#9A3412",
    fontWeight: "500",
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
    minWidth: 900,
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
  pendingRow: {
    backgroundColor: "#FFF7ED",
  },
  cell: {
    paddingHorizontal: 16,
    paddingVertical: 18,
    justifyContent: "center",
  },
  orderColumn: {
    width: 140,
  },
  customerColumn: {
    width: 180,
  },
  issueColumn: {
    width: 360,
  },
  statusColumn: {
    width: 130,
  },
  actionColumn: {
    width: 150,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1D4ED8",
  },
  customerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
  },
  issueText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#475569",
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
  },
  openBadge: {
    backgroundColor: "#FEF3C7",
    borderColor: "#FCD34D",
  },
  resolvedBadge: {
    backgroundColor: "#ECFDF5",
    borderColor: "#A7F3D0",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  openBadgeText: {
    color: "#B45309",
  },
  resolvedBadgeText: {
    color: "#047857",
  },
  resolveButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#99F6E4",
    backgroundColor: "#F0FDFA",
  },
  resolveButtonDisabled: {
    backgroundColor: "#F8FAFC",
    borderColor: "#CBD5E1",
  },
  resolveButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0F766E",
  },
  resolveButtonTextDisabled: {
    color: "#64748B",
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
