import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth } from '../firebase'

const StudyScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Study</Text>
        </View>
    )
}

export default StudyScreen

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
