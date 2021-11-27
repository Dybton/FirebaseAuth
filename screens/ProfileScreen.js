import { StyleSheet, Text, View, TouchableOpacity, addons } from 'react-native'
import { auth, db, getDoc, doc } from '../firebase'
import Separator from '../components/Separator'
import React, { useState, useEffect } from 'react';
import ProfileComponent from '../components/ProfileComponent';
import UserBooksComponent from '../components/UserBooksComponent';
import { isLoaded } from 'expo-font';
import { useNavigation } from '@react-navigation/native';
// How can I pass data to this screen from homeScreen?

const ProfileScreen = ({books}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState([{id: 1, title: 'Loading', author: 'Loading', name: 'Loading' }]); // Dummy object
  const [Loaded, setLoaded] = useState(false);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [booksInProgress, setBooksInProgress] = useState([]);
  const [sender, setSender] = useState('profile');

  // Calling the getMethods when the page loads, or when the page is rerendered. 
  useEffect(() => {
    function fetchData(){
      getUser();
    }
    fetchData();
  }, [Loaded])

  const getUser = async () => {
    const userRef = db.collection('userObjects');
    try {
      const users = await userRef.where("uid", "==", auth.currentUser.uid).get();
      for(const doc of users.docs){
        const data = doc.data();
        setUser(data)
      }
    } catch(err) {
      alert(err)
    } finally {
      setLoaded(true)
      if(Loaded) {
        SetReadBooks();
        SetReadingBooks();
      }
    }
  }

  const SetReadBooks = () => {
    if(Loaded) 
    {
      let booksRead = [];
      user.read.forEach(element => {
        let book = books.filter(d => 
          d.title == element
          )
          booksRead.push(book[0])
      });
      setFinishedBooks(booksRead)
    }
  }

  const SetReadingBooks = () => {
    if(Loaded)
    {
      let booksReading = [];
      for (let i = 0; i <= user.reading.length - 1; i++) {
        let book = books.filter(d => 
          d.title == user.reading[i].title)
          booksReading.push(book[0])
      }
      setBooksInProgress(booksReading)
    }
  }

  // Helper function that finds the user's read books and returns them in array form 
  function getReadBooksArray(){
    const readBooks = [];
    const size = user.read.length;
    for (let i = 0; i <= size - 1; i++) {
      readBooks.push(books.filter(x => x.title === bookArray[i]))
    }
    return (readBooks)
}
    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.navigate("Login")
          })
          .catch(error => alert(error.message))
      }

    if(user === undefined) {
      return(
      <View>
        <Text>Loading</Text>
      </View>
      );
    } else {
    return (
    <View style={styles.container}>
        <View style={styles.headerContainer}> 
          <Text style={styles.headerText}> Books in progress </Text>
        </View>
        <Separator/>
        <UserBooksComponent books={booksInProgress} sender={sender}/>
        <View style={styles.headerContainer}> 
          <Text style={styles.headerText}> Finished books </Text>
        </View>
        <Separator/>
        <UserBooksComponent books={finishedBooks} sender={sender}/>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
              onPress={handleSignOut}
              style={styles.button}
          >
          <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
        </View>
    </View>
    )
}}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
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
    }, headerContainer: {
      paddingTop: 50,
      alignItems: 'center',
    },
    headerText: {
      color: 'black',
      fontWeight: '400',
      fontSize: 30,
    }, buttonContainer: {
      paddingTop: 50,
      alignItems: 'center',
    }
  })
