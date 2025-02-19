import AsyncStorage from "@react-native-async-storage/async-storage";

// 🚀 Load todos from AsyncStorage
const loadTodos = async () => {
  try {
    const storedTodos = await AsyncStorage.getItem("todos");
    return storedTodos !== null ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error("Failed to load todos:", error);
    return [];
  }
};

// ❌ Delete a single todo by ID
export const deleteTodo = async (id) => {
  try {
    const todos = await loadTodos();
    const updatedTodos = todos.filter((todo) => todo.id !== id);

    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
    console.log(`🗑️ Todo with id ${id} deleted successfully.`);
  } catch (error) {
    console.error("❌ Failed to delete todo:", error);
  }
};

// ✏️ Edit an existing todo by ID
export const editTodo = async (id, updatedFields) => {
  try {
    const todos = await loadTodos();
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedFields } : todo
    );

    await AsyncStorage.setItem("todos", JSON.stringify(updatedTodos));
    console.log(`✅ Todo with id ${id} updated successfully.`);
  } catch (error) {
    console.error("❌ Failed to update todo:", error);
  }
};

// 🧪 Example Usage (Uncomment to test):
// (async () => {
//   await editTodo("todo-id-123", { title: "Updated Task", priority: "High" });
//   await deleteTodo("todo-id-123");
// })();
