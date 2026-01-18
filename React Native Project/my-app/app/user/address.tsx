import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import api from "../../services/api";

type Address = {
  id: number;
  name: string;
  phone: string;
  city: string;
  pincode: string;
  addressLine: string;
};

export default function AddressScreen() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    pincode: "",
    addressLine: "",
  });

  useEffect(() => {
    loadAddresses();
  }, []);

  const loadAddresses = async () => {
    try {
      const res = await api.get("/address/my");
      setAddresses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const saveAddress = async () => {
    if (!form.name || !form.phone || !form.city) return;

    try {
      await api.post("/address/add", form);
      setShowModal(false);
      setForm({
        name: "",
        phone: "",
        city: "",
        pincode: "",
        addressLine: "",
      });
      loadAddresses();
    } catch (err) {
      console.log(err);
    }
  };

  const renderItem = ({ item }: { item: Address }) => (
    <View style={styles.card}>
      <Text style={styles.name}>{item.name}</Text>
      <Text>{item.addressLine}</Text>
      <Text>
        {item.city} - {item.pincode}
      </Text>
      <Text>📞 {item.phone}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Addresses</Text>

      <FlatList
        data={addresses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.empty}>No address found</Text>
        }
      />

      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.addText}>+ Add Address</Text>
      </TouchableOpacity>

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modal}>
          <Text style={styles.modalTitle}>Add Address</Text>

          <TextInput
            placeholder="Full Name"
            style={styles.input}
            value={form.name}
            onChangeText={(v) => setForm({ ...form, name: v })}
          />
          <TextInput
            placeholder="Phone"
            style={styles.input}
            value={form.phone}
            onChangeText={(v) => setForm({ ...form, phone: v })}
          />
          <TextInput
            placeholder="City"
            style={styles.input}
            value={form.city}
            onChangeText={(v) => setForm({ ...form, city: v })}
          />
          <TextInput
            placeholder="Pincode"
            style={styles.input}
            value={form.pincode}
            onChangeText={(v) => setForm({ ...form, pincode: v })}
          />
          <TextInput
            placeholder="Address Line"
            style={[styles.input, { height: 70 }]}
            multiline
            value={form.addressLine}
            onChangeText={(v) => setForm({ ...form, addressLine: v })}
          />

          <TouchableOpacity style={styles.saveBtn} onPress={saveAddress}>
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => setShowModal(false)}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  name: {
    fontWeight: "700",
    fontSize: 16,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#777",
  },
  addBtn: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  addText: {
    color: "#fff",
    fontWeight: "700",
  },
  modal: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: "#16a34a",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  saveText: {
    color: "#fff",
    fontWeight: "700",
  },
  cancelBtn: {
    padding: 14,
    alignItems: "center",
  },
});
