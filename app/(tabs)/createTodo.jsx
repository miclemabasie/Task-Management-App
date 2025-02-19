import { View, Text, StyleSheet, TouchableOpacity, Platform, ScrollView } from 'react-native';
import React, { useId, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoInputField from '../../components/ui/TodoInputField';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import {useRouter } from 'expo-router'
import { v4 as uuid } from "uuid";

const CreateTodo = () => {
  const router = useRouter()


  const [todoData, setTodoData] = useState({
    id: '',
    title: '',
    description: '',
    priority: '',
    dueDate: '',
    startTime: '',
    endTime: '',
  });

  const [showPickers, setShowPickers] = useState({
    dueDate: false,
    startTime: false,
    endTime: false,
  });

  const handleChange = (key, value) => {
    setTodoData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (event, selectedDate, key) => {
    if (selectedDate) handleChange(key, selectedDate.toISOString());
    setShowPickers((prev) => ({ ...prev, [key]: false }));
  };

  const getUid =() => {
    return Date.now().toString(36)
  }


  const handleSubmit = async () => {
    try {
      // const small_id = unique_id.slice(0, 8);
      todoData.id = getUid()
      const existingTodos = await AsyncStorage.getItem('todos');
      const todos = existingTodos ? JSON.parse(existingTodos) : [];
      const updatedTodos = [...todos, todoData];
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
      console.log(updatedTodos)
      console.log(todoData)
      router.push({
        pathname: "/todo-detail",
        params: todoData
      })
    } catch (error) {
      console.error('❌ Error saving todo:', error);
    }
  };

  const formatDateTime = (timestamp, type = 'date') =>
    timestamp
      ? new Date(timestamp).toLocaleString([], {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: type === 'time' ? '2-digit' : undefined,
          minute: type === 'time' ? '2-digit' : undefined,
        })
      : '';

  const DateTimeField = ({ label, value, onPress }) => (
    <TouchableOpacity style={styles.inputField} onPress={onPress}>
      <Text style={{ color: value ? '#000' : '#888' }}>
        {value || `Select ${label}`}
      </Text>
      <Ionicons name="calendar-outline" size={20} color="#888" />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create New Todo</Text>

      <TodoInputField
        placeholder="Title"
        value={todoData.title}
        onChangeText={(text) => handleChange('title', text)}
      />

      <TodoInputField
        placeholder="Description"
        value={todoData.description}
        onChangeText={(text) => handleChange('description', text)}
        multiline
      />

      <TodoInputField
        placeholder="Priority (High, Medium, Low)"
        value={todoData.priority}
        onChangeText={(text) => handleChange('priority', text)}
      />

      {/* 📅 Due Date Field */}
      <DateTimeField
        label="Due Date"
        value={formatDateTime(todoData.dueDate)}
        onPress={() => setShowPickers((prev) => ({ ...prev, dueDate: true }))}
      />
      {showPickers.dueDate && (
        <DateTimePicker
          value={todoData.dueDate ? new Date(todoData.dueDate) : new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'inline' : 'default'}
          onChange={(event, date) => handleDateChange(event, date, 'dueDate')}
        />
      )}

      {/* 🕒 Start Time Field */}
      <DateTimeField
        label="Start Time"
        value={formatDateTime(todoData.startTime, 'time')}
        onPress={() => setShowPickers((prev) => ({ ...prev, startTime: true }))}
      />
      {showPickers.startTime && (
        <DateTimePicker
          value={todoData.startTime ? new Date(todoData.startTime) : new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => handleDateChange(event, date, 'startTime')}
        />
      )}

      {/* 🕓 End Time Field */}
      <DateTimeField
        label="End Time"
        value={formatDateTime(todoData.endTime, 'time')}
        onPress={() => setShowPickers((prev) => ({ ...prev, endTime: true }))}
      />
      {showPickers.endTime && (
        <DateTimePicker
          value={todoData.endTime ? new Date(todoData.endTime) : new Date()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => handleDateChange(event, date, 'endTime')}
        />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
            Create Todo
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default CreateTodo;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 20,
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'white',
  },
  inputField: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#555',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#333',
    fontSize: 18,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
  },
});
