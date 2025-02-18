import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/ui/Header'
import Title from '../../components/ui/Title'
import CategoryBox from '../../components/ui/CategoryBox'
import TodoList from '../../components/ui/TodoList'

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
      <Text>This is is</Text>
      {/* <Header user={user} />
      <Title size={30} color={'white'} text={"Manage Your Daily Task"}/>
      
      <CategoryBox />

      <TodoList /> */}
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
})