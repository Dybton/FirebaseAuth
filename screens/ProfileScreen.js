import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth, db } from '../firebase'
import Separator from '../components/Separator'
import React, { useState, useEffect } from 'react';
import ProfileComponent from '../components/ProfileComponent';
import UserBooksComponent from '../components/UserBooksComponent';
// How can I pass data to this screen from homeScreen?

const ProfileScreen = ({navigation, propName}) => {
    const [isLoading, setIsLoading] = useState(true);
    console.log(propName)
    const [user, setUser] = useState([{
          // Dummy object
          id: 1,
          title: 'Loading',
          author: 'Loading',
          name: 'Loading'
        },]);

  useEffect(() => {
    getUser();
  }, [])

  async function getUser() {
    db.collection('userObjects').onSnapshot(snapshot => (
      setUser(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
  ))
  }

    // Signout Function
    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login")
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
        <UserBooksComponent user={user}/>
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
