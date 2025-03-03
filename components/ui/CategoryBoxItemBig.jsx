import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const CategoryBoxItemBig = ({image, title, color}) => {

  return (
    <View style={[styles.boxContainer, , {backgroundColor: color}]}>
        <Image 
            source={image}
            style={styles.image} 
        />

        
        <View style={styles.categoryInfo}>
            <Text style={styles.categoryTitle}>{title}</Text>
            <Text style={styles.quantity}>5 Tasks</Text>
      </View>
    </View>
  )
}

export default CategoryBoxItemBig

const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: "#76aa99",
        padding: 20,
        flexDirection: 'column',
        gap: 20,
        borderRadius: 20,
        flex: 1,
    },
    image: {
        width: 50,
        height: 50,
        resizeMode: 'cover',
    },

    categoryInfo: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },

    categoryTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },

    quantity: {
        color: "#444"
    }
});