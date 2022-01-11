import React from 'react'
import { StyleSheet, Text, Touchable, View, TouchableOpacity, Alert } from 'react-native'
import BookDetailComponent from '../components/BookDetailComponent';
import theme from '../assets/themes';
import { useNavigation } from '@react-navigation/native';
import { auth, db, arrayUnion, FieldValue } from '../firebase';
import * as firebase from 'firebase'; // Is there a way to import this without having to get everything down?


const BookDetailScreen = ({ route }) => {
    const { book, user, parentFunc } = route.params;
    const navigation = useNavigation();
    const addBook = () => {
        if (checkIfBookIsInLibrary()) {
            showAlertError();
        } else {
            db.collection('userObjects').doc(user.uid).update({
                reading: firebase.firestore.FieldValue.arrayUnion({
                    title: book.title,
                    page: 0,
                })
            }).catch(error => alert(error.message))
            parentFunc();
            showAlert();
        }
    }

    const checkIfBookIsInLibrary = () => {
        let bookInLibrary = false;
        user.reading.forEach(element => {
            if (element.title == book.title) {
                bookInLibrary = true;
            }
        });
        return bookInLibrary;
    }

    const showAlert = () => {
        Alert.alert(
            'Book Added',
            '',
            [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]
        );
    }

    const showAlertError = () => {
        Alert.alert(
            'Already in Library',
            '',
            [
                { text: 'OK', onPress: () => navigation.goBack() },
            ]
        );
    }


    return (
        <View style={styles.container}>
            <Text> Title: {book.title} </Text>
            <Text> Author: {book.author} </Text>
            <Text> Id: {book.id} </Text>
            <TouchableOpacity
                onPress={() => { addBook() }}
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
