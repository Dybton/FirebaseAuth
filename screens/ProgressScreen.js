import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const ProgressScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>ProgressScreen</Text>
            <TouchableOpacity onPress={()=> navigation.replace("StudyQuestions")}>
                <Text> Study </Text>
            </TouchableOpacity>
        </View>
    )
}

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
