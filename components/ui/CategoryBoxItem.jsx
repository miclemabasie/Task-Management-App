import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const CategoryBoxItem = ({ title, image, color }) => {
    console.log("this is title", title)
  return (
    <View style={[styles.boxContainer, { backgroundColor: color }]}>
      <Image source={image} style={styles.image} />
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryTitle}>{title}</Text>
        <Text style={styles.quantity}>5 Tasks</Text>
      </View>
    </View>
  )
}

export default CategoryBoxItem

const styles = StyleSheet.create({
  boxContainer: {
    backgroundColor: "#76aa99",
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',  // Align image and text properly
    borderRadius: 15,
  
  },
  image: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginRight: 10, // Adds spacing between image and text
  },
  categoryInfo: {
    justifyContent: 'center',  // Centers text vertically
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Ensures text is visible

  },
  quantity: {
    color: '#DDD',
    fontSize: 14,
  },
})
