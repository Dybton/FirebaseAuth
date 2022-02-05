import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import Card from '../components/Card'
import Books from '../components/Books'
import React, { useState, useEffect } from 'react';
import Separator from '../components/Separator'
import theme from '../assets/themes';
import { auth, db } from '../firebase';
import bookPage from '../assets/data/bookPage';

const HomeScreen = ({ books, parentFunc, user}) => {
  const [userObject, setUserObject] = useState(user)
  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> Hello {user.name}</Text>
      </View>
      <Separator />
      <View style={styles.subtitleContainer}>
        <Text style={styles.imageTitle}> Choose one or more books</Text>
      </View>
      <View>
        <Books books={books} user={user} parentFunc={parentFunc}/>
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
  subtitleContainer: {
    paddingTop: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontWeight: '400',
    fontSize: 30,
  }, imageTitle: {
    ...theme.textVariants.h1,
    color: theme.colors.white,
},
imageSubtitle: {
    ...theme.textVariants.body2,
    color: theme.colors.white,
}
})