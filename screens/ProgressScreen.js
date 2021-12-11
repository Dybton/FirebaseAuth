import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useState, useRef, useEffect } from 'react';
import WheelPicker from '../components/WheelPicker';

const ProgressScreen = ({ navigation, books, user }) => {
  const [bookIndex, setBookIndex] = useState(0)

  const pickerRef = useRef();

  /**
   * Pickerref is a function in the WheelPicker component (child). It only runs when bookIndex changes
   */
  useEffect(() => {
    pickerRef.current()
  }, [bookIndex])

  /** Function that updates the bookIndex */
  const nextBook = (() => {
    if (bookIndex < books.length - 1) {
      setBookIndex(bookIndex + 1)
    }
  })

  return (
    <View style={styles.container}>
      <Text> {books[bookIndex].title} </Text>
      <Text> {books[bookIndex].author} </Text>
      <Text> How far have you read? </Text>
      <WheelPicker pickerRef={pickerRef}
        pages={books[bookIndex].pageNumber}
        currentProgress={books[bookIndex].pageNumber - 10}
      />
      <Button title="Next" onPress={() => nextBook()} />
      <View>
      </View>
    </View>
  );
};

export default ProgressScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  picker: {
    width: '100%',
    height: '350px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
})
