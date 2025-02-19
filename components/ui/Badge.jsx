import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Badge = ({priority, color}) => {
  return (
      <Text style={[styles.badge, {backgroundColor: color}]}>{priority}</Text>
  )
}

export default Badge

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: "red",
    padding: 5,
    color: "white",
    borderRadius: 10,
    fontSize: 17
  }
})