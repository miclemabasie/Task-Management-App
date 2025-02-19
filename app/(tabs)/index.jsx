import { View, Text, StyleSheet, Modal, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../components/ui/Header'
import Title from '../../components/ui/Title'
import CategoryBox from '../../components/ui/CategoryBox'
import TodoList from '../../components/ui/TodoList'
import TodoInputField from '../../components/ui/TodoInputField'

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
      <Modal
        visible={true}
        animationType="slide"
        onRequestClose={() => setEditModalVisible(false)}
      >
        <ScrollView style={styles.modalContainer}>
          <Text style={styles.header}>Edit Todo</Text>
          
        </ScrollView>
      </Modal>
      <CategoryBox />

      <TodoList />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 220,
  }
})