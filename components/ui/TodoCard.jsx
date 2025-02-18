import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Badge from './Badge'

const TodoCard = ({title, description, priority, dueDate}) => {
  return (
    <View style={styles.todoItemContainer}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Badge priority={priority}/>
        <Text style={{color:"#bababa"}}>82%</Text>
      </View>
      <Text style={{color: "white", fontSize: 23, marginTop: 10}}>{title}</Text>
      <Text style={{color: "#bababa", fontSize: 15, marginTop: 10}}>10.00 AM - 06:00 PM</Text>
      <Text style={{color: "#bababa", fontSize: 15, marginTop: 20}}>Due Date: <Text style={{color: "white", fontSize: 15, marginTop: 10}}>Auguest 25</Text></Text>
    </View>
  )
}

export default TodoCard

const styles = StyleSheet.create({

  todoItemContainer: {
    backgroundColor: "#2b2929",
    marginBottom: 10,
    padding: 15,
    borderRadius: 10
  }
})