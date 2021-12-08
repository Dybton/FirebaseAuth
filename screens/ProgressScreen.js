import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react';
import WheelPicker from '../components/WheelPicker';

const ProgressScreen = ({ navigation, books, user }) => {
  const [bookIndex, setBookIndex] = useState(0)

  const nextBook = (() => {
    if (bookIndex < books.length - 1) {
      setBookIndex(bookIndex + 1)
    }
  })

  function handleChange(index) {
    if (!startedToScroll) {
      setStartedToScroll(true);
    }
    setIndexSelected(index);
  }

  console.log(books[bookIndex].pageNumber);

  return (
    <View style={styles.container}>


      <Text> {books[bookIndex].title} </Text>
      <Text>  </Text>
      <Text> {books[bookIndex].author} </Text>
      <Text> How far have you read? </Text>
      <WheelPicker
        pages={books[bookIndex].pageNumber}
        currentProgress={12}
      />

      {/* The current progress needs to take the books reading length */}
      {/* On next it needs to update the current progress */}



      <Button title="Next" onPress={() => nextBook()} />
      {/* <TouchableOpacity title="Study!" onPress={() => navigation.navigate('StudyQuestions')} /> */}
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
