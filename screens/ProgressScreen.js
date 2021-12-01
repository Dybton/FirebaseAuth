import { StyleSheet, Text, View, TouchableOpacity, Button} from 'react-native'
import React, { useState } from 'react';

const ProgressScreen = ({navigation, books, user}) => {
  const [bookIndex, setBookIndex] = useState(0)
  
  const nextBook = (() => {
    if (bookIndex < books.length - 1) {
      setBookIndex(bookIndex + 1)
    }
  })

    return (
      <View style={styles.container}>
          <Text> {books[bookIndex].title} </Text>
          <Text> {books[bookIndex].author} </Text>
          <Text> How far have you read? </Text> 
          <Button title="Next" onPress={() => nextBook()} />
          {/* <TouchableOpacity title="Study!" onPress={() => navigation.navigate('StudyQuestions')} /> */}
          <View>
            {/* <WheelPicker
            pages={10}
            currentProgress={3}
            />  */}
          </View>
          
      </View>   
    );
};

export default ProgressScreen

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
