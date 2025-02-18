import { Tabs } from 'expo-router';
import React from 'react';
import { Platform} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs 
      screenOptions={{
        tabBarActiveTintColor: 'white',  // Proper tint color for dark mode
        tabBarInactiveTintColor: 'gray', // Subtle color for inactive tabs
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2b2929', // Dark background for the tab bar
          borderTopWidth: 0, // Removes top border for a cleaner look
          elevation: 0, // Removes shadow on Android
          paddingBottom: 5, // Adjusted padding
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          marginVertical: 10,

        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />

<Tabs.Screen
        name="createTodo"        
        options={{
          title: '+',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="todos"        
        options={{
          title: 'To-Dos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="check-circle" color={color} size={size} />
          ),
        }}
      />

 

      
    </Tabs>
  );
}


