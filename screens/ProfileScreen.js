import { StyleSheet, Text, View, TouchableOpacity, addons } from 'react-native'
import { auth, db } from '../firebase'
import Separator from '../components/Separator'
import React, { useState, useEffect } from 'react';
import ProfileComponent from '../components/ProfileComponent';
import UserBooksComponent from '../components/UserBooksComponent';
import { isLoaded } from 'expo-font';
import theme from '../assets/themes'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
// How can I pass data to this screen from homeScreen?

const ProfileScreen = ({ books }) => {
  const navigation = useNavigation();
  const [user, setUser] = useState([{ id: 1, title: 'Loading', author: 'Loading', name: 'Loading' }]); // Dummy object
  const [Loaded, setLoaded] = useState(false);
  const [finishedBooks, setFinishedBooks] = useState([]);
  const [booksInProgress, setBooksInProgress] = useState([]);
  const [sender, setSender] = useState('profile');
  const [userStatus, setUserStatus] = useState([{ reading: 'Loading' }]); // Dummy object

  // Calling the getMethods when the page loads, or when the page is rerendered. 
  useEffect(() => {
    function fetchData() {
      getUser();
      getUserStatus();
    }
    fetchData();
  }, [Loaded])

  const getUserStatus = () => {
    db.collection('userObjects').where("uid", "==", auth.currentUser.uid).onSnapshot(snapshot => (
      setUserStatus(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    ))
  }

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setStatus(userStatus[0].reading)
  //   })
  // );

  const getUser = async () => {
    const userRef = db.collection('userObjects');
    try {
      const users = await userRef.where("uid", "==", auth.currentUser.uid).get();
      for (const doc of users.docs) {
        const data = doc.data();
        setUser(data)
      }
    } catch (err) {
      alert(err)
    } finally {
      setLoaded(true)
      if (Loaded) {
        SetReadBooks();
        SetReadingBooks();
      }
    }
  }

  const SetReadBooks = () => {
    if (Loaded) {
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
    if (Loaded) {
      let booksReading = [];
      for (let i = 0; i <= user.reading.length - 1; i++) {
        let book = books.filter(d =>
          d.title == user.reading[i].title)
        booksReading.push(book[0])
      }
      setBooksInProgress(booksReading)
    }
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("Login")
      })
      .catch(error => alert(error.message))
  }

  if (user === undefined) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>

        <View style={styles.booksContainer}>
          {/* Books in progress */}
          <View style={styles.headerContainer}>
          <Text style={styles.headerText}> Books in Progress </Text>
          </View>
          <Separator />
          <UserBooksComponent books={booksInProgress} sender={sender} />

        </View>
        <View style={styles.booksContainer}>
          {/* Books in progress */}
          <View style={styles.headerContainer}>
          <Text style={styles.headerText}> Finished Books </Text>  
          </View>
          <Separator />
          <UserBooksComponent books={finishedBooks} sender={sender} />

        </View>
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
  }
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  booksContainer: {
    height: '43.5%',
  },
  button: {
    backgroundColor: theme.colors.primary,
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  }, headerContainer: {
    alignItems: 'center',
  },
  headerText: {
    color: theme.colors.white,
    fontWeight: '400',
    fontSize: 30,
    alignItems: 'center'
  }, buttonContainer: {
    alignItems: 'center',
  }
})
