import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const BookDetailScreen = () => {
    return (
        <View style={styles.container}>
            <Text>BookDetailScreen</Text>
        </View>
    )
}

export default BookDetailScreen

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
