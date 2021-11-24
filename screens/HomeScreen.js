import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Card from '../components/Card'
import Books from '../components/Books'
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import bookPage from '../assets/data/bookPage';

const HomeScreen = ({navigation, books}) => {
  return (
    <Books books={books}/>
  )
}



// I need to do something about the ordering!

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
})