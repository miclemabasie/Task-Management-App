import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/ui/Header'
import Title from '../../components/ui/Title'

const HomeScreen = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    setUser({
      username: "Kottlin",
      email: "james@example.com",
      age: 30
    })
  }, [])

  return (
    <View style={styles.container}>
      <Header user={user} />
      <Title size={30} color={'white'} text={"Manage Your Daily Task"}/>
      <Text>HomeScreen</Text>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20
  }
})