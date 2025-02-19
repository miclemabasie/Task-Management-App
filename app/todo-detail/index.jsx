import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Badge from '../../components/ui/Badge';
import { deleteTodo, editTodo } from '../../utils/TodoManager.js'
import AntDesign from '@expo/vector-icons/AntDesign';



const TodoDetailView = () => {
  const navigation = useNavigation();
  const { id, title, description, priority, dueDate, startTime, endTime } = useLocalSearchParams();
  const priorityColors = {
    High: 'red',
    Medium: 'orange',
    Low: 'green',
  };

  const handleEdit = () => {
    // 📝 For simplicity, using prompts (Replace with your form/modal in real scenarios)
    Alert.prompt(
      "Edit Todo",
      "Enter new title for this task:",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Save",
          onPress: async (newTitle) => {
            if (newTitle) {
              await editTodo(id, { title: newTitle });
              console.log(`📝 Todo ${id} updated with title: ${newTitle}`);
            } else {
              console.log("⚠️ No changes made.");
            }
          },
        },
      ],
      "plain-text"
    );
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
            router.push('/(tabs)/todos')
          },
          style: "destructive",
        },
      ]
    );
  };
  
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const timestamp = Number(timeString);
    const date = new Date(timestamp);
    if (isNaN(date)) return 'Invalid time';

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${hours}.${minutes} ${period}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(Number(dateString));
    if (isNaN(date)) return 'Invalid date';
    const options = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: '',
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
          <TouchableOpacity 
            onPress={() => deleteTodo(id)}
          >

            <AntDesign name="delete" size={24} color="red" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

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
            {formatDate(startTime)} {formatTime(startTime)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>End Date:</Text>
          <Text style={styles.detailValue}>
            {formatDate(endTime)} {formatTime(endTime)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Title:</Text>
          <Text style={styles.detailValue}>{title}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Due Date:</Text>
          <Text style={styles.detailValue}>{formatDate(dueDate)}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeading}>Description:</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </View>

        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHeading}>ID:</Text>
          <Text style={styles.descriptionText}>{id}</Text>
        </View>

        <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <MaterialCommunityIcons name="pencil-outline" size={24} color="green" />
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleDelete}>
        <MaterialCommunityIcons name="trash-can-outline" size={24} color="red" />
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
      </View>
     
    </View>
  );
};

export default TodoDetailView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#93dbef",
    flex: 1,
    padding: 5,
  },
  headerStyle: {
    backgroundColor: '#93dbef',
    elevation: 0,
    borderBottomWidth: 0,
    shadowOpacity: 0,
    paddingVertical: 15,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 15,
    marginRight: 15,
  },
  headerContainer: {
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 26, // Bigger heading
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: "black",
    flex: 1,
    borderRadius: 20,
    marginTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailLabel: {
    color: 'white',
    flex: 2,
    fontWeight: 'bold',
    fontSize: 18, // Increased text size
  },
  detailValue: {
    color: 'white',
    flex: 3,
    fontSize: 18, // Increased text size
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionHeading: {
    color: 'white',
    fontSize: 20, // Bigger heading for description
    fontWeight: 'bold',
    marginBottom: 5,
  },
  descriptionText: {
    color: 'white',
    fontSize: 18, // Bigger text size for description
    lineHeight: 24,
  },
});


// <TouchableOpacity 
//             onPress={() => console.log("Edit pressed")}
//           >
//           <MaterialCommunityIcons
//             name="trash-can-outline"
//             size={24}
//             color="red"
//             onPress={() => deleteTodo(id)}
//           />
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             onPress={() => console.log("Edit pressed")}
//           >
//           <MaterialCommunityIcons
//             name="pencil-outline"
//             size={24}
//             color="black"
            
//           />
//           </TouchableOpacity>