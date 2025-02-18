import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import TodoCard from './TodoCard'
import { useRouter } from 'expo-router';

const TodoList = () => {
  let tasksItems = [
    {title: 'Design new app', description: 'Work on some new app design', startTime: Date.now(), endTime: Date.now(), priority: 'high', dueDate: Date.now(), isComplete: false},
    {title: 'Fix Bugs', description: 'Resolve issues in existing project', startTime: Date.now(), endTime: Date.now(), priority: 'medium', dueDate: Date.now(), isComplete: false},
    {title: 'Write Documentation', description: 'Prepare user guide and API docs', startTime: Date.now(), endTime: Date.now(), priority: 'low', dueDate: Date.now(), isComplete: false},
    {title: 'Write Documentation', description: 'Prepare user guide and API docs', startTime: Date.now(), endTime: Date.now(), priority: 'low', dueDate: Date.now(), isComplete: false},
    {title: 'Write Documentation', description: 'Prepare user guide and API docs', startTime: Date.now(), endTime: Date.now(), priority: 'low', dueDate: Date.now(), isComplete: false},
    {title: 'Write Documentation', description: 'Prepare user guide and API docs', startTime: Date.now(), endTime: Date.now(), priority: 'low', dueDate: Date.now(), isComplete: false},
    {title: 'Write Documentation', description: 'Prepare user guide and API docs', startTime: Date.now(), endTime: Date.now(), priority: 'low', dueDate: Date.now(), isComplete: false},
    {title: 'Write Documentation', description: 'Prepare user guide and API docs', startTime: Date.now(), endTime: Date.now(), priority: 'low', dueDate: Date.now(), isComplete: false},
    {title: 'Write Documentation', description: 'Prepare user guide and API docs', startTime: Date.now(), endTime: Date.now(), priority: 'low', dueDate: Date.now(), isComplete: false},
    {title: 'Write Documentation', description: 'Prepare user guide and API docs', startTime: Date.now(), endTime: Date.now(), priority: 'low', dueDate: Date.now(), isComplete: false}
  ];

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(tasksItems);
  }, []); 

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

  const router = useRouter();

  return (
    <View style={styles.todoListBox}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Text style={{ color: 'white', fontSize: 24, fontWeight: "bold" }}>Ongoing</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/todos')}>
          <Text style={{ color: 'white' }}>See All</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        renderItem={renderTaskItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

export default TodoList;

const styles = StyleSheet.create({
  todoListBox: {
    marginTop: 20,
  }
});
