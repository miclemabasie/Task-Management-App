import { Tabs } from 'expo-router';
import React from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'white', // Proper tint color for dark mode
        tabBarInactiveTintColor: 'gray', // Subtle color for inactive tabs
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#444141', // Dark background for the tab bar
          elevation: 0, // Removes shadow on Android
          width: '90%',
          alignSelf: 'center',
          borderRadius: 20,
          height: 70, // Increased height for better padding
          paddingBottom: 15, // Adds space inside the tab bar for icons
          paddingTop: 10, // Ensures the icons are centered vertically
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

      {/* Floating Add Todo Button */}
      <Tabs.Screen
        name="createTodo"
        options={{
          title: '',
          tabBarIcon: () => (
            <View style={styles.floatingButton}>
              <MaterialCommunityIcons name="plus" color={'white'} size={30} />
            </View>
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

const styles = StyleSheet.create({
  floatingButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -25, // Moves above the tab bar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Android shadow
  },
});
