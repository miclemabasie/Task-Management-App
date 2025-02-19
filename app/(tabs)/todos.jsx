import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoCard from '../../components/ui/TodoCard';
import { useRouter } from 'expo-router';

const Todos = () => {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();  
  const [refreshing, setRefreshing] = useState(false)
  
   

  // 🚀 Load todos from AsyncStorage
  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        setTasks(JSON.parse(storedTodos));
      } else {
        setTasks([]); // No todos found, set empty
      }
    } catch (error) {
      console.error('Failed to load todos:', error);
    }
  };


  useEffect(() => {
    loadTodos(); // Load on mount
    console.log(tasks.length)
  }, []);

  // // load todos during refresh
  // const handleRefreshing = () => {
  //   setRefreshing(true)
  //     loadTodos();
  //   setRefreshing(false)
  // }
  const renderTaskItem = ({ item }) => (
    <TodoCard
      title={item.title}
      description={item.description}
      priority={item.priority}
      startTime={item.startTime}
      endTime={item.endTime}
      dueDate={item.dueDate}
    />
  );

  return (
    <View style={styles.todoListBox}>
      

      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.empty}>No Todos Available</Text>}
        // refreshing={refreshing}
        // onRefresh={handleRefreshinggg}
      />
    </View>
  );
};

export default Todos;

const styles = StyleSheet.create({
  todoListBox: {
    marginTop: 80,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  seeAll: {
    color: 'white',
  },
  empty: {
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
});

