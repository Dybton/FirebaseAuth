import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth } from '../firebase'
import Separator from '../components/Separator'

// How can I pass data to this screen from homeScreen?

const ProfileScreen = ({navigation}) => {
    const handleSignOut = () => {
        auth
          .signOut()
          .then(() => {
            navigation.replace("Login")
          })
          .catch(error => alert(error.message))
      }

    return (
    <View style={styles.container}>
        <Text>ProfileScreen Screen </Text>
        <Text>Email: {auth.currentUser?.email}</Text>
        <Text> Uid = {auth.currentUser?.uid} </Text>
        <Text> My books </Text>
        <Text> Book 1 </Text>
        <Text> Book 1 </Text>
        <Text> Book 1 </Text>
        <Separator/>
        <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
        >
        <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
    </View>
    )
}

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
