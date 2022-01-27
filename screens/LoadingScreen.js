import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth } from '../firebase';
import theme from '../assets/themes'


const LoadingScreen = ({navigation, route}) => {
    const isFromProgressScreen = route.params;

    // If coming from ProgressScreen, navigate to StudyScreen (after 1 second)
    // else do the other stuff
    useEffect(() => {
      if(isFromProgressScreen !== undefined) {
        navigation.navigate("StudyQuestions");
      } else {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("HomeTab")
          } else {
            navigation.replace("Login")
          }
        })
        return unsubscribe
      }}, [])
      
    return (
        <View style={styles.container}>
            <Text >Loading</Text>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
  imageTitle: {
      color: 'white',
      ...theme.textVariants.h1,
  }
});





