import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Badge from './Badge';
import { useRouter } from 'expo-router';

// Function to format time (e.g., "10.00 AM")
const formatTime = (timeString) => {
  if (!timeString) return 'N/A';
  
  const date = new Date(timeString);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const period = hours >= 12 ? 'PM' : 'AM';
  
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Converts 0 to 12
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${formattedHours}.${formattedMinutes} ${period}`;
};

// Function to format date (e.g., "August 25")
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';

  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric' }; // "August 25"
  return date.toLocaleDateString('en-US', options);
};

const TodoCard = ({id, title, description, priority, startTime, endTime, dueDate }) => {

  const router = useRouter();
  const priorityColors = {
    High: 'red',
    Medium: 'orange',
    Low: 'green',
  };
  return (
    <TouchableOpacity 
      onPress={() => router.push({
        pathname: 'todo-detail',
        params: { id, title, description, priority, startTime, endTime, dueDate }
      })}
    >
      <View style={styles.todoItemContainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Badge priority={priority} color={priorityColors[priority]}/>
          <Text style={{ color: "#bababa" }}>82%</Text>
        </View>

        <Text style={{ color: "white", fontSize: 23, marginTop: 10 }}>{title}</Text>

        {/* Dynamically show formatted time */}
        <Text style={{ color: "#bababa", fontSize: 15, marginTop: 10 }}>
          {formatTime(startTime)} - {formatTime(endTime)}
        </Text>

        {/* Dynamically show formatted due date */}
        <Text style={{ color: "#bababa", fontSize: 15, marginTop: 20 }}>
          Due Date: <Text style={{ color: "white", fontSize: 15 }}>{formatDate(dueDate)}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  todoItemContainer: {
    backgroundColor: "#2b2929",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10,
  }
});
