import { StyleSheet, Text, View, TouchableOpacity, addons } from 'react-native'
import { auth, db, getDoc, doc } from '../firebase'
import Separator from '../components/Separator'
import React, { useState, useEffect } from 'react';
import ProfileComponent from '../components/ProfileComponent';
import UserBooksComponent from '../components/UserBooksComponent';
import { isLoaded } from 'expo-font';
// How can I pass data to this screen from homeScreen?

const ProfileScreen = ({navigation, books}) => {
  const [user, setUser] = useState([{id: 1, title: 'Loading', author: 'Loading', name: 'Loading' }]); // Dummy object
  // const [books1, setBooks1] = useState([{id: 1, title: 'Loading', author: 'Loading', name: 'Loading' }]); // Dummy object
  const [Loaded, setLoaded] = useState(false);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [booksInProgress, setBooksInProgress] = useState([]);


  
  // const [userBooks, setUserBooks] = useState([{id: 1, title: 'Loading', author: 'Loading', name: 'Loading' }]); // Dummy object

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

// const getBooks = async () => {
  //   const booksRef = db.collection('books');
  //   try {
  //     const books = await booksRef.get();
  //     for(const doc of books.docs){
  //       const data = doc.data();
  //     }
  //   } catch(err) {
  //     alert(err)
  //   }
  // }
  


  // const getBooks = () => {
  //   db.collection('books').onSnapshot(snapshot => (
  //       setBooks(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
  //   ))
  // }
  

  // const getUser = () => {
  //   db.collection('userObjects').where("uid", "==", auth.currentUser.uid).get().then((snapshot) => {
  //     snapshot.forEach(doc => {
  //       const data = doc.data();

  //       console.log(data.email);
  //       setUser(data)
  //     })})
  //     return true;
  //   }

  // This function takes an array and some objects. // It then finds the objects where the array values matches the objects titles
  // getReadBooks(userBooks[0].read)
  // This is not currently in use
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
        
        <ProfileComponent user={user}/>
        <Text> Books in progress </Text>
        <UserBooksComponent books={booksInProgress}/>
        <Text> Finished Books </Text>
        <UserBooksComponent books={finishedBooks}/>
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
