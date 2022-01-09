import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import WheelPicker from '../components/WheelPicker';
import { db, auth, Timestamp } from '../firebase';
import * as firebase from 'firebase'; // Is there a way to import this without having to get everything down?
import { useNavigation } from '@react-navigation/native';
import theme from '../assets/themes'



// We need to get all the cards, where page < selected item (page nr)
// I won't get it real time

// I need to do it for all the books


// Get the user object - should be a get method
const getCards = async (book, page) => {
  const cardRef = db.collection('cards').where("book", "==", book);
  try {
    const cards = await cardRef.get();
    for (const doc of cards.docs) {
      const data = doc.data();
      if (page >= data.page) {
        setUserCard(data)

      }
    }
  } catch (err) {
    alert(err)
  }
}

// Creates a userCard in firestore
const setUserCard = async (data) => {
  const userCardId = auth.currentUser.uid + "_" + data.cardID;
  const userCardRef = db.collection("userCards").doc(userCardId);
  const document = await userCardRef.get();
  try {
    document.data().cardID
    console.log("Document exists")
  } catch (error) {
    console.log("Document does not exists")
    userCardRef.set({
      book: data.book,
      cardID: data.cardID,
      question: data.question,
      answer: data.answer,
      userID: auth.currentUser.uid,
      nextReview: firebase.firestore.FieldValue.serverTimestamp(),
      step: 0,
    })
  }
}


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
      getCards(books[(bookIndex - 1)].title, selectedItem)
      // console.log("the you have reached page " + selectedItem + " in the book " + books[(bookIndex - 1)].title)
      updatePage(selectedItem, (bookIndex - 1))
    } if (lastBook) {
      getCards(books[(bookIndex)].title, selectedItem)
      // console.log("the you have reached page " + selectedItem + " in the book " + books[(bookIndex)].title)
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
    // console.log(objectToChange)
    // console.log(reading);

    db.collection("userObjects").doc(user.uid).update({
      reading: reading
    }).then(function () {
      console.log("Page updated");
    });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.imageTitle}> {books[bookIndex].title} </Text>
      <Text style={styles.imageSubtitle}> {books[bookIndex].author} </Text>
      <Text style={styles.imageSubtitle}> How far have you read? </Text>
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
  }, imageTitle: {
    ...theme.textVariants.h1,
    color: theme.colors.white,
  },
  imageSubtitle: {
    ...theme.textVariants.body2,
    color: theme.colors.white
  }
})
