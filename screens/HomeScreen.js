import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import Card from '../components/Card'
import Books from '../components/Books'
import React, { useState, useEffect } from 'react';
import Separator from '../components/Separator'
import { auth, db } from '../firebase';
import bookPage from '../assets/data/bookPage';

const HomeScreen = ({ books, parentFunc, user}) => {
  const [userObject, setUserObject] = useState(user)

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> Welcome {user.name}</Text>
      </View>
      <Separator />
      <View>
        <Books books={books} user={user} parentFunc={parentFunc} />
      </View>
      <Image style={styles.image} source={require('../assets/images/PileOfBooks.png')}/>
    </View>
  )
}

export default HomeScreen

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
  headerContainer: {
    paddingTop: 50,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 30,
  }
})