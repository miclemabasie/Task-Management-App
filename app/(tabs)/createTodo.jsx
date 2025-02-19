import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams, useNavigation } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Badge from "../../components/ui/Badge";
import { deleteTodo, editTodo } from "../../utils/TodoManager.js";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import TodoInputField from "../../components/ui/TodoInputField";

const TodoDetailView = () => {
  const navigation = useNavigation();
  const { id, title, description, priority, dueDate, startTime, endTime } =
    useLocalSearchParams();
  const priorityColors = { High: "red", Medium: "orange", Low: "green" };

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [todoData, setTodoData] = useState({
    id,
    title,
    description,
    priority,
    dueDate,
    startTime,
    endTime,
  });
  const [showPickers, setShowPickers] = useState({
    dueDate: false,
    startTime: false,
    endTime: false,
  });

  const handleChange = (key, value) =>
    setTodoData((prev) => ({ ...prev, [key]: value }));

  const handleDateChange = (event, selectedDate, key) => {
    if (selectedDate) handleChange(key, selectedDate.toISOString());
    setShowPickers((prev) => ({ ...prev, [key]: false }));
  };

  const handleEditSubmit = async () => {
    await editTodo(id, todoData);
    console.log(`📝 Todo ${id} updated.`);
    setEditModalVisible(false);
    router.push({ pathname: "/todo-detail", params: todoData });
  };

  const handleDelete = async () => {
    Alert.alert(
      "Delete Confirmation",
      "Are you sure you want to delete this todo?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteTodo(id);
            console.log(`🗑️ Todo ${id} deleted successfully.`);
            router.push("/(tabs)/todos");
          },
          style: "destructive",
        },
      ]
    );
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerStyle: styles.headerStyle,
      headerBackTitleVisible: false,
      headerLeft: () => (
        <View>
          <MaterialCommunityIcons
            name="chevron-left"
            size={24}
            color="black"
            onPress={() => navigation.goBack()}
          />
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerIcons}>
          <TouchableOpacity onPress={handleDelete}>
            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const formatDateTime = (timestamp, type = "date") =>
    timestamp
      ? new Date(timestamp).toLocaleString([], {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: type === "time" ? "2-digit" : undefined,
          minute: type === "time" ? "2-digit" : undefined,
        })
      : "";

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Todo Details</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Priority:</Text>
          <Badge priority={priority} color={priorityColors[priority]} />
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Start Date:</Text>
          <Text style={styles.detailValue}>
            {formatDateTime(startTime, "time")}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>End Date:</Text>
          <Text style={styles.detailValue}>
            {formatDateTime(endTime, "time")}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Title:</Text>
          <Text style={styles.detailValue}>{title}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Due Date:</Text>
          <Text style={styles.detailValue}>{formatDateTime(dueDate)}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeading}>Description:</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setEditModalVisible(true)}
          >
            <MaterialCommunityIcons
              name="pencil-outline"
              size={24}
              color="green"
            />
            <Text style={styles.buttonText}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleDelete}>
            <MaterialCommunityIcons
              name="trash-can-outline"
              size={24}
              color="red"
            />
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 📝 Edit Modal */}
      <Modal
        visible={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.header}>Edit Todo</Text>
          <TodoInputField
            placeholder="Title"
            value={todoData.title}
            onChangeText={(text) => handleChange("title", text)}
          />
          <TodoInputField
            placeholder="Description"
            value={todoData.description}
            onChangeText={(text) => handleChange("description", text)}
            multiline
          />
          <TodoInputField
            placeholder="Priority (High, Medium, Low)"
            value={todoData.priority}
            onChangeText={(text) => handleChange("priority", text)}
          />

          {/* 📅 Due Date Field */}
          <TouchableOpacity
            style={styles.inputField}
            onPress={() =>
              setShowPickers((prev) => ({ ...prev, dueDate: true }))
            }
          >
            <Text>{formatDateTime(todoData.dueDate)}</Text>
            <MaterialCommunityIcons name="calendar" size={20} color="#888" />
          </TouchableOpacity>
          {showPickers.dueDate && (
            <DateTimePicker
              value={todoData.dueDate ? new Date(todoData.dueDate) : new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={(event, date) =>
                handleDateChange(event, date, "dueDate")
              }
            />
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleEditSubmit}
            >
              <Text
                style={{ color: "white", fontSize: 16, fontWeight: "bold" }}
              >
                Submit Changes
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

export default TodoDetailView;

const styles = StyleSheet.create({
  container: { backgroundColor: "#93dbef", flex: 1, padding: 5 },
  headerStyle: {
    backgroundColor: "#93dbef",
    elevation: 0,
    borderBottomWidth: 0,
  },
  headerIcons: { flexDirection: "row", gap: 15, marginRight: 15 },
  headerContainer: { marginTop: 20, marginBottom: 10, alignItems: "center" },
  headerTitle: { fontSize: 26, fontWeight: "bold" },
  detailsContainer: {
    padding: 15,
    backgroundColor: "black",
    flex: 1,
    borderRadius: 20,
    marginTop: 20,
  },
  detailRow: { flexDirection: "row", marginBottom: 15 },
  detailLabel: { color: "white", flex: 2, fontWeight: "bold", fontSize: 18 },
  detailValue: { color: "white", flex: 3, fontSize: 18 },
  descriptionContainer: { marginTop: 20 },
  descriptionHeading: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  descriptionText: { color: "white", fontSize: 18, lineHeight: 24 },
  buttonContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: { marginLeft: 5, fontWeight: "bold" },
  modalContainer: { marginTop: 40, padding: 20, flex: 1 },
  submitButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 8,
  },
  inputField: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#555",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#333",
    color: "white",
  },
});
