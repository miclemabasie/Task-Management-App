import AsyncStorage from "@react-native-async-storage/async-storage";

// 🚀 Load todos from AsyncStorage
const loadTodos = async () => {
  try {
    const storedTodos = await AsyncStorage.getItem("todos");
    if (storedTodos !== null) {
      setTasks(JSON.parse(storedTodos));
    } else {
      setTasks([]); // No todos found, set empty
    }
  } catch (error) {
    console.error("Failed to load todos:", error);
  }
};

export const deleteTodo = (id) => {
  // delete a single todo from the list of todos in asyncStorage
  // get all todos
  const existingTodos = loadTodos();
  console.log("this are the existing todos", existingTodos);
};
