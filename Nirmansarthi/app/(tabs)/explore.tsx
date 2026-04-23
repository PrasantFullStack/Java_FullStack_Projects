import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
//explore this page

const { width } = Dimensions.get("window");

const categoryData = [
  { title: "Materials", icon: "cube-outline", count: 22, color: "#2F5BEA" },
  {
    title: "Equipment",
    icon: "construct-outline",
    count: 14,
    color: "#059669",
  },
  { title: "Suppliers", icon: "people-outline", count: 30, color: "#DC2626" },
  { title: "Deals", icon: "pricetags-outline", count: 9, color: "#D97706" },
];

const allItems = [
  {
    id: 1,
    title: "Cement",
    detail: "Portland cement 50kg",
    price: 220,
    category: "Materials",
    rating: 4.5,
    location: "Mumbai",
    image: "🏗️",
  },
  {
    id: 2,
    title: "Steel Rods",
    detail: "TMT bars 12mm",
    price: 6500,
    category: "Materials",
    rating: 4.2,
    location: "Delhi",
    image: "🔧",
  },
  {
    id: 3,
    title: "Sand",
    detail: "River sand per m3",
    price: 420,
    category: "Materials",
    rating: 4.0,
    location: "Pune",
    image: "🏖️",
  },
  {
    id: 4,
    title: "Paint",
    detail: "Premium emulsion 20L",
    price: 4100,
    category: "Materials",
    rating: 4.7,
    location: "Bangalore",
    image: "🎨",
  },
  {
    id: 5,
    title: "Concrete Mixer",
    detail: "Electric mixer 10HP",
    price: 45000,
    category: "Equipment",
    rating: 4.3,
    location: "Chennai",
    image: "⚙️",
  },
  {
    id: 6,
    title: "Bricks",
    detail: "Red clay bricks 1000pcs",
    price: 3200,
    category: "Materials",
    rating: 4.1,
    location: "Kolkata",
    image: "🧱",
  },
  {
    id: 7,
    title: "Cement Tiles",
    detail: "Designer tiles 2x2ft",
    price: 85,
    category: "Materials",
    rating: 4.6,
    location: "Ahmedabad",
    image: "🔲",
  },
  {
    id: 8,
    title: "Steel Pipes",
    detail: "GI pipes 2inch",
    price: 180,
    category: "Materials",
    rating: 4.4,
    location: "Hyderabad",
    image: "🔩",
  },
];

const sortOptions = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Rating", value: "rating" },
  { label: "Newest", value: "newest" },
];

const filterOptions = [
  { label: "All Categories", value: "all" },
  { label: "Materials", value: "Materials" },
  { label: "Equipment", value: "Equipment" },
  { label: "Suppliers", value: "Suppliers" },
  { label: "Deals", value: "Deals" },
];

export default function ExploreScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [recentSearches] = useState(["cement", "steel", "paint"]);

  const filteredAndSortedItems = useMemo(() => {
    let filtered = allItems.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.detail.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price_asc":
          return a.price - b.price;
        case "price_desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
        default:
          return b.id - a.id;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const renderItemCard = ({ item }: { item: (typeof allItems)[0] }) => (
    <TouchableOpacity style={styles.itemCard}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemEmoji}>{item.image}</Text>
        <View style={styles.itemRating}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDetail}>{item.detail}</Text>
        <View style={styles.itemFooter}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={14} color="#6B7280" />
            <Text style={styles.locationText}>{item.location}</Text>
          </View>
          <Text style={styles.itemPrice}>₹{item.price.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <Text style={styles.subtitle}>
          Find top construction products and suppliers
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products, suppliers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <MaterialIcons name="filter-list" size={24} color="#2F5BEA" />
        </TouchableOpacity>
      </View>

      {/* Recent Searches */}
      {searchQuery.length === 0 && recentSearches.length > 0 && (
        <View style={styles.recentSearches}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          <View style={styles.recentTags}>
            {recentSearches.map((search, index) => (
              <TouchableOpacity
                key={index}
                style={styles.recentTag}
                onPress={() => setSearchQuery(search)}
              >
                <Text style={styles.recentTagText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      {/* Filters */}
      {showFilters && (
        <View style={styles.filtersContainer}>
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {filterOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterChip,
                    selectedCategory === option.value &&
                      styles.filterChipActive,
                  ]}
                  onPress={() => setSelectedCategory(option.value)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedCategory === option.value &&
                        styles.filterChipTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Sort By</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {sortOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.filterChip,
                    sortBy === option.value && styles.filterChipActive,
                  ]}
                  onPress={() => setSortBy(option.value)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      sortBy === option.value && styles.filterChipTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.cardRow}>
          {categoryData.map((item) => (
            <TouchableOpacity
              key={item.title}
              style={styles.metricCard}
              onPress={() => setSelectedCategory(item.title)}
            >
              <Ionicons name={item.icon as any} size={28} color={item.color} />
              <Text style={[styles.metricCount, { color: item.color }]}>
                {item.count}
              </Text>
              <Text style={styles.metricLabel}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Items List */}
      <View style={styles.itemsSection}>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === "all" ? "All Products" : selectedCategory}
            {searchQuery.length > 0 && ` (${filteredAndSortedItems.length})`}
          </Text>
          <TouchableOpacity>
            <Text style={styles.showAll}>Show all</Text>
          </TouchableOpacity>
        </View>

        {filteredAndSortedItems.length > 0 ? (
          <FlatList
            data={filteredAndSortedItems}
            renderItem={renderItemCard}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.itemsList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color="#D1D5DB" />
            <Text style={styles.emptyStateTitle}>No products found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filters
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 6,
  },
  subtitle: {
    color: "#6B7280",
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: "#333333",
  },
  filterButton: {
    padding: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  recentSearches: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  recentTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  recentTag: {
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  recentTagText: {
    color: "#374151",
    fontSize: 14,
  },
  filtersContainer: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  filterSection: {
    marginBottom: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 8,
  },
  filterChip: {
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: "#2F5BEA",
  },
  filterChipText: {
    color: "#374151",
    fontSize: 14,
    fontWeight: "500",
  },
  filterChipTextActive: {
    color: "#FFFFFF",
  },
  categoriesSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  cardRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
  },
  metricCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  metricCount: {
    marginTop: 12,
    fontSize: 24,
    fontWeight: "700",
    color: "#2F5BEA",
  },
  metricLabel: {
    marginTop: 4,
    fontSize: 14,
    color: "#374151",
  },
  itemsSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
  },
  showAll: {
    color: "#2F5BEA",
    fontWeight: "600",
  },
  itemsList: {
    paddingBottom: 32,
  },
  itemCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  itemEmoji: {
    fontSize: 32,
  },
  itemRating: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF8E1",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: "600",
    color: "#F59E0B",
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  itemDetail: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 12,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#6B7280",
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#059669",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});
