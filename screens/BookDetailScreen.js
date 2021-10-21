import React from 'react'
import { StyleSheet, Text, Touchable, View, TouchableOpacity, Alert } from 'react-native'
import BookDetailComponent from '../components/BookDetailComponent';
import theme from '../assets/themes';
import { useNavigation } from '@react-navigation/native';


const BookDetailScreen = ({route}) => {
    const book = route.params;
    const navigation = useNavigation();

    const showAlert = () => {
        Alert.alert(  
            'Book Added',  
            '',  
            [   
                {text: 'OK', onPress: () => navigation.goBack()},  
            ]  
        );  
    }

    return (
        <View style={styles.container}>
            <Text> Title: {book.book.title} </Text>
            <Text> Author: {book.book.author} </Text>
            <Text> Id: {book.book.id} </Text>
            <TouchableOpacity
            onPress={() => {showAlert()}}
            style={styles.button}
            >
                <Text style={styles.buttonText}>Add Book</Text>
            </TouchableOpacity>

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
      }
    }
)
