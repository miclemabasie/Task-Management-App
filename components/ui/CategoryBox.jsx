import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CategoryBoxItem from './CategoryBoxItem'
import CategoryBoxItemBig from './CategoryBoxItemBig'

const CategoryBox = () => {
  return (
    <View style={styles.categoryBox}>
      {/* <Text>CategoryBox</Text> */}
      <View style={{
        flex: 2,
        justifyContent: 'space-between'
      }}>
      <CategoryBoxItemBig title={'Work'} color={'#A7ABE7'} image={require('../../assets/images/categories/cat-work.png')}/>
      </View>

      <View style={{
        flex: 3,
        justifyContent: 'space-between',
        gap: 10,
      }}>
      <CategoryBoxItem title={'Family'} color={'#83c4c4'} image={require('../../assets/images/categories/cat-idea.png')}/>
      <CategoryBoxItem title={'Home'} color={'#e7e0a7'} image={require('../../assets/images/categories/cat-house.png')}/>
      </View>
    </View>
  )
}

export default CategoryBox

const styles = StyleSheet.create({
  categoryBox: {
    marginTop: 20,
    flex: 1,
    maxHeight: 150,
    flexDirection: "row",
    gap: 20,
  }
})