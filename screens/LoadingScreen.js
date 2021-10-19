import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { auth } from '../firebase'

const LoadingScreen = ({navigation}) => {

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            navigation.replace("HomeTab")
          } else {
            navigation.replace("Login")
          }
        })
        return unsubscribe
      }, [])
      
    return (
        <View style={styles.container}>
            <Text>Loading</Text>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

