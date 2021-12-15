import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import WheelPicker from '../components/WheelPicker';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';


const ProgressScreen = ({ books, user, parentFunc }) => {
  const navigation = useNavigation();
  const [bookIndex, setBookIndex] = useState(0)
  const [lastBook, setLastBook] = useState(false)

  const pickerRef = useRef();

  /**
   * Pickerref is a function in the WheelPicker component (child). It only runs when bookIndex changes.
   */
  useEffect(() => {
    pickerRef.current()
  }, [bookIndex, lastBook])

  /** Function that updates the bookIndex */
  const nextBook = (() => {
    if (bookIndex < user.reading.length - 1) {
      setBookIndex(bookIndex + 1)
    }
    if (bookIndex === user.reading.length - 1) {
      setLastBook(true)
    }
  })

  // This is only called when bookIndex is updated
  const callback = useCallback((selectedItem) => {
    if (bookIndex !== 0 && !lastBook) {
      console.log("the you have reached page " + selectedItem + " in the book " + books[(bookIndex - 1)].title)
      updatePage(selectedItem, (bookIndex - 1))
    } if (lastBook) {
      console.log("the you have reached page " + selectedItem + " in the book " + books[(bookIndex)].title)
      updatePage(selectedItem, bookIndex)
      navigation.navigate("StudyQuestions");
    }
  });

  // So now I need to use the data above to update the userObject.
  // Create a helper function, and pass in the data
  // Take an input from the useCallBack func, the bookIndex and the selected item
  // we have the index, so we need to say => update page: with selected item, for the book which has index x

  // I need to get all the 

  const updatePage = (pageProgress, index) => {
    parentFunc();
    const reading = user.reading
    const objectToChange = reading[index];
    objectToChange.page = pageProgress;
    console.log(objectToChange)
    console.log(reading);

    db.collection("userObjects").doc(user.uid).update({
      reading: reading
    }).then(function () {
      console.log("Page updated");
    });
  }


  return (
    <View style={styles.container}>
      <Text> {books[bookIndex].title} </Text>
      <Text> {books[bookIndex].author} </Text>
      <Text> How far have you read? </Text>
      <WheelPicker pickerRef={pickerRef}
        pages={books[bookIndex].pageNumber}
        currentProgress={user.reading[bookIndex].page}
        parentCallback={callback}
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
