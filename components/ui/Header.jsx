import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import EvilIcons from '@expo/vector-icons/EvilIcons';
import Entypo from '@expo/vector-icons/Entypo';

const Header = ({ user }) => {
  console.log('this is the user:', user)

  return (
    <View style={styles.headerContainer}>
      {user ? (
        <>
          <Text style={styles.username}><Text style={styles.helloText}>Hello </Text>{user.username} 👋</Text>
        </>
      ) : (
        <Text>Sign-In</Text>
      )}
    <TouchableOpacity style={styles.notificationContainer}>
      <Entypo style={styles.notificationIndicator} name="dot-single" size={24} color="red" />
      <EvilIcons name="bell" size={30} color="white" />
    </TouchableOpacity>
    </View>
  )
}

export default Header


const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
  },

  username: {
    color:  "white",
    fontSize: 20,

  },
  helloText: {
    color: "#3b3636",
  }, 

  notificationContainer: {
    backgroundColor: "#332f2f",
    padding: 5,
    borderRadius: 50,
    
  },

  notificationIndicator: {
    position: "absolute",
    top: 1,
    right: 3,
    zIndex: 2
  }
})