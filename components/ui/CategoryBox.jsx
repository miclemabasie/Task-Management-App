import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CategoryBoxItem from './CategoryBoxItem'
import CategoryBoxItemBig from './CategoryBoxItemBig'

const CategoryBox = () => {
  return (
    <View style={styles.categoryBox}>
      {/* Large Category Item */}
      <View style={styles.bigBox}>
        <CategoryBoxItemBig title="Work" color="#A7ABE7" image={require('../../assets/images/categories/cat-work.png')} />
      </View>

      {/* Small Category Items */}
      <View style={styles.smallBoxes}>
        <CategoryBoxItem title="Family" color="#83c4c4" image={require('../../assets/images/categories/cat-idea.png')} />
        <CategoryBoxItem title="Home" color="#e7e0a7" image={require('../../assets/images/categories/cat-house.png')} />
      </View>
    </View>
  )
}

export default CategoryBox

const styles = StyleSheet.create({
  categoryBox: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    paddingHorizontal: 10,
  },
  bigBox: {
    flex: 2,
    marginRight: 10, // Adds spacing between the big and small boxes
  },
  smallBoxes: {
    flex: 3,
    justifyContent: 'space-between',
    gap: 10
  },
})
