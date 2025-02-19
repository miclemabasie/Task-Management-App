import { PrivateValueStore } from '@react-navigation/native';
import { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


const createTodo = ({placeholder, value, onChangeText}) => {
  const [text, setText] = useState('');
  
  return (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor="#888"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
)};

export default createTodo;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15
  },
  input: {
    height: 55,
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#333',
    fontSize: 18,
  },
});


