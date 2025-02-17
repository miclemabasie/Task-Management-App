import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Title = ({text, color, size}) => {
  return (
    <View style={styles.HeadlineContainer}>
      <Text style={[styles.text, {color: color, fontSize: size}]}>{text}</Text>
      <View style={styles.emptySpace}></View>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
  HeadlineContainer: {

    flexDirection: "row",
  },
  text: {
    flex: 2,
    fontWeight: "bold",
    lineHeight: 40
  },

  emptySpace: {
    flex: 1
  }

})