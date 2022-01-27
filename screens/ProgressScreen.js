import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native'
import React, { useState, useRef, useEffect, useCallback } from 'react';
import WheelPicker from '../components/WheelPicker';
import { db, auth, Timestamp } from '../firebase';
import * as firebase from 'firebase'; // Is there a way to import this without having to get everything down?
import { useNavigation } from '@react-navigation/native';
import theme from '../assets/themes'

const ProgressScreen = ({ books, user, parentFunc }) => {
  const navigation = useNavigation();
  const [bookIndex, setBookIndex] = useState(0)
  const [lastBook, setLastBook] = useState(false)
  const [booksInProgress, setBooksInProgress] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  const pickerRef = useRef();

  // Get the card object
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
    console.log(data.book)
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
  console.log("Setusercards function")
}

  /**
   * Pickerref is a function in the WheelPicker component (child). It only runs when bookIndex changes.
   */
  useEffect(() => {
    if (user.reading.length !== 0 && isLoaded) {
      pickerRef.current()
    }
    SetReadingBooks()
    console.log(lastBook)
  }, [bookIndex, lastBook, isLoaded])

  // Find all the readingbooks
  const SetReadingBooks = () => {
    let booksReading = [];
    for (let i = 0; i <= user.reading.length - 1; i++) {
      let book = books.filter(d =>
        d.title == user.reading[i].title)
      booksReading.push(book[0])
    }
    setBooksInProgress(booksReading)
    setIsLoaded(true)
}

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
      getCards(booksInProgress[(bookIndex - 1)].title, selectedItem)
      updatePage(selectedItem, (bookIndex - 1))
    } if (lastBook) {
      console.log("callback triggered")
      getCards(booksInProgress[(bookIndex)].title, selectedItem)
      updatePage(selectedItem, bookIndex)
      // navigation.navigate("Loading", {isFromProgressScreen: true});
      navigation.navigate("StudyQuestions");
    }
  });


  // when is it last book?

  const updatePage = (pageProgress, index) => {
    parentFunc();
    const reading = user.reading
    const objectToChange = reading[index];
    objectToChange.page = pageProgress;

    db.collection("userObjects").doc(user.uid).update({
      reading: reading
    }).then(function () {
      console.log("Page updated");
    });
  }

  if ((user.reading.length === 0)) {
    return (
      <View style={styles.container}>
        <Text style={styles.imageTitle}> Kindly select a book</Text>
      </View >
    );
  } if(isLoaded) {
    return (
      <View style={styles.container}>
        <Text style={styles.imageTitle}> {booksInProgress[bookIndex].title} </Text>
        <Text style={styles.imageSubtitle}> {booksInProgress[bookIndex].author} </Text>
        <Text style={styles.imageSubtitle}> How far have you read? </Text>
        <WheelPicker pickerRef={pickerRef}
          pages={booksInProgress[bookIndex].pageNumber}
          currentProgress={user.reading[bookIndex].page}
          parentCallback={callback}
        />
        <TouchableOpacity style={styles.button} onPress={() => nextBook()}>
          <Text style={styles.buttonText}>
            Next
          </Text>
        </TouchableOpacity>
        <View>
        </View>
      </View >
    )
  } else {
    return (
      <View>
        <Text> Loading </Text>
      </View>
    )
  }
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
    backgroundColor: theme.colors.primary,
    width: '50%',
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
