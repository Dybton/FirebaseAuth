import { StyleSheet, Text, View, TouchableOpacity, addons } from 'react-native'
import { auth, db } from '../firebase'
import Separator from '../components/Separator'
import React, { useState, useEffect } from 'react';
import ProfileComponent from '../components/ProfileComponent';
import UserBooksComponent from '../components/UserBooksComponent';
// How can I pass data to this screen from homeScreen?

const ProfileScreen = ({navigation, books}) => {
  const [user, setUser] = useState([{id: 1, title: 'Loading', author: 'Loading', name: 'Loading' }]); // Dummy object
  const [userBooks, setUserBooks] = useState([{id: 1, title: 'Loading', author: 'Loading', name: 'Loading' }]); // Dummy object

  // Calling the getMethods when the page loads, or when the page is rerendered. 
  useEffect(() => {
    getUser();
    getUserBooks();
  }, [])

  // Here we get the user object
  async function getUser() {
    db.collection("userObjects").where("uid", "==", auth.currentUser.uid).onSnapshot(snapshot => (
      setUser(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
  ))}

  // Where we get the userBook object
  async function getUserBooks() {
    db.collection("userBooks").where("uid", "==", auth.currentUser.uid).onSnapshot(snapshot => (
      setUserBooks(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
  ))}

  
  // This function gets the read books - tested. - WE USE THIS
  // function getReadBooks() {
  //   if (userBooks[0].id !== 1 ) {
  //     const readBooks = [];
  //     const size = userBooks[0].read.length;
  //     for (let i = 0; i <= size - 1; i++) {
  //       readBooks.push(books.filter(x => x.title === userBooks[0].read[i]))
  //     }

  //   return(readBooks)
  //   }
  // }

  // This function takes an array and some objects. It then finds the objects where the array values matches the objects titles
  // getReadBooks(userBooks[0].read)
  function getReadBooks(bookArray) {
    if (userBooks[0].id !== 1 ) {
      const readBooks = [];
      const size = bookArray.length;
      for (let i = 0; i <= size - 1; i++) {
        readBooks.push(books.filter(x => x.title === bookArray[i]))
      }

    console.log(readBooks)
    }
  }

  getReadBooks(getReadingBookTitles())

  // This method finds the reading book titles
  function getReadingBookTitles() {
    if (userBooks[0].id !== 1 ) {
      // const size = userBooks[0].reading.length;
      const readingBookTitles = [];
      const size = userBooks[0].reading.length;
      for (let i = 0; i <= size - 1; i++) {
        readingBookTitles.push(userBooks[0].reading[i].title)
      }
      return(readingBookTitles)
    }
  }


  

  // Signout Function - Doesn't work! Need to fix!
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
        <Text> </Text>
        <ProfileComponent user={user}/>
        <UserBooksComponent user={user} books={books}/>
        <Separator/>
        <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
        >
        <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
    </View>
    )
}}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
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
