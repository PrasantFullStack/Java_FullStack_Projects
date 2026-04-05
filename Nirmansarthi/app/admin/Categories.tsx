import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Category = {
  id: string;
  name: string;
  type: string;
  usage: string;
};

const INITIAL_CATEGORIES: Category[] = [
  {
    id: "CAT-001",
    name: "Cement",
    type: "Material",
    usage: "Structural foundation and concrete work",
  },
  {
    id: "CAT-002",
    name: "Steel Rods",
    type: "Material",
    usage: "Reinforcement for slabs, beams, and columns",
  },
  {
    id: "CAT-003",
    name: "Scaffolding",
    type: "Equipment",
    usage: "Temporary access support during exterior work",
  },
  {
    id: "CAT-004",
    name: "Wall Paint",
    type: "Finishing",
    usage: "Interior and exterior surface coating",
  },
  {
    id: "CAT-005",
    name: "Safety Helmets",
    type: "Safety",
    usage: "On-site head protection for workers",
  },
  {
    id: "CAT-006",
    name: "Tiles",
    type: "Finishing",
    usage: "Flooring and wall cladding applications",
  },
];

const NEW_CATEGORY_TEMPLATES = [
  {
    name: "Bricks",
    type: "Material",
    usage: "Wall construction and partition work",
  },
  {
    name: "Power Tools",
    type: "Equipment",
    usage: "Drilling, cutting, and fitting tasks",
  },
  {
    name: "Waterproofing",
    type: "Chemical",
    usage: "Moisture protection for roofs and walls",
  },
];

function CategoryRow({
  item,
  onEdit,
  onDelete,
}: {
  item: Category;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <View style={styles.row}>
      <View style={[styles.cell, styles.nameColumn]}>
        <Text style={styles.primaryText}>{item.name}</Text>
      </View>
      <View style={[styles.cell, styles.typeColumn]}>
        <Text style={styles.secondaryText}>{item.type}</Text>
      </View>
      <View style={[styles.cell, styles.usageColumn]}>
        <Text style={styles.usageText}>{item.usage}</Text>
      </View>
      <View style={[styles.cell, styles.actionsColumn]}>
        <View style={styles.actions}>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onEdit(item.id)}
            style={[styles.actionButton, styles.editButton]}
          >
            <Ionicons name="create-outline" size={16} color="#1D4ED8" />
            <Text style={[styles.actionText, styles.editText]}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => onDelete(item.id)}
            style={[styles.actionButton, styles.deleteButton]}
          >
            <Ionicons name="trash-outline" size={16} color="#B91C1C" />
            <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default function Categories() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);

  const filteredCategories = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return categories;
    }

    return categories.filter((category) => {
      return (
        category.name.toLowerCase().includes(normalizedQuery) ||
        category.type.toLowerCase().includes(normalizedQuery) ||
        category.usage.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [categories, searchQuery]);

  const handleAddCategory = () => {
    const template =
      NEW_CATEGORY_TEMPLATES[categories.length % NEW_CATEGORY_TEMPLATES.length];
    const nextNumber = categories.length + 1;

    setCategories((current) => [
      {
        id: `CAT-${String(nextNumber).padStart(3, "0")}`,
        name: template.name,
        type: template.type,
        usage: template.usage,
      },
      ...current,
    ]);
  };

  const handleEditCategory = (id: string) => {
    setCategories((current) =>
      current.map((category) =>
        category.id === id
          ? {
              ...category,
              name: category.name.includes("Updated")
                ? category.name
                : `${category.name} Updated`,
              usage: `${category.usage} Refined for admin review.`,
            }
          : category,
      ),
    );
  };

  const handleDeleteCategory = (id: string) => {
    const category = categories.find((item) => item.id === id);

    if (!category) {
      return;
    }

    Alert.alert(
      "Delete category",
      `Remove ${category.name} from the categories list?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () =>
            setCategories((current) =>
              current.filter((item) => item.id !== id),
            ),
        },
      ],
    );
  };

  return (
    <Pressable style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Categories Management</Text>
          <Text style={styles.subtitle}>
            Organize construction catalog groups with searchable table controls.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleAddCategory}
          style={styles.addButton}
        >
          <Ionicons name="add" size={18} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Add Category</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.toolbar}>
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={18} color="#64748B" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search by category, type, or usage"
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Visible Categories</Text>
          <Text style={styles.summaryValue}>{filteredCategories.length}</Text>
        </View>
      </View>

      <View style={styles.tableCard}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <View style={[styles.headerCell, styles.nameColumn]}>
                <Text style={styles.headerText}>Category Name</Text>
              </View>
              <View style={[styles.headerCell, styles.typeColumn]}>
                <Text style={styles.headerText}>Type</Text>
              </View>
              <View style={[styles.headerCell, styles.usageColumn]}>
                <Text style={styles.headerText}>Usage</Text>
              </View>
              <View style={[styles.headerCell, styles.actionsColumn]}>
                <Text style={styles.headerText}>Actions</Text>
              </View>
            </View>

            <FlatList
              data={filteredCategories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <CategoryRow
                  item={item}
                  onEdit={handleEditCategory}
                  onDelete={handleDeleteCategory}
                />
              )}
              showsVerticalScrollIndicator={false}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Ionicons name="grid-outline" size={28} color="#94A3B8" />
                  <Text style={styles.emptyTitle}>No categories found</Text>
                  <Text style={styles.emptyText}>
                    Try another search term or add a new category.
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
    maxWidth: 290,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1D4ED8",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  toolbar: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
    alignItems: "center",
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
  summaryCard: {
    minWidth: 130,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  summaryLabel: {
    fontSize: 12,
    color: "#64748B",
    marginBottom: 4,
    fontWeight: "600",
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0F172A",
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
  nameColumn: {
    width: 190,
  },
  typeColumn: {
    width: 150,
  },
  usageColumn: {
    width: 340,
  },
  actionsColumn: {
    width: 180,
  },
  primaryText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1D4ED8",
  },
  usageText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#475569",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  editButton: {
    backgroundColor: "#EFF6FF",
    borderColor: "#BFDBFE",
  },
  deleteButton: {
    backgroundColor: "#FEF2F2",
    borderColor: "#FECACA",
  },
  actionText: {
    fontSize: 13,
    fontWeight: "700",
  },
  editText: {
    color: "#1D4ED8",
  },
  deleteText: {
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
