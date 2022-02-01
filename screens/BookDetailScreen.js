import React from 'react'
import { StyleSheet, Text, Touchable, View, TouchableOpacity, Alert, Image } from 'react-native'
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

    const checkIfMoreThanOneBook = () => {
        let moreThanOneBook = false;
        if (user.reading.length > 0) {
            moreThanOneBook = true;
        } 
        return moreThanOneBook;
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

    // const showAlertErrorOnlyOneBook = () => {
    //     Alert.alert(
    //         'You can only read one book at a time',
    //         '',
    //         [
    //             { text: 'OK', onPress: () => navigation.goBack() },
    //         ]
    //     );
    // }


    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.imageTitle}> {book.title} </Text>
                <Text style={styles.imageTitle}>Written by {book.author}</Text>
                <TouchableOpacity
                    onPress={() => { addBook() }}
                    style={styles.button}
                >
                    <Text style={styles.imageSubtitle}>Add Book</Text>
                </TouchableOpacity>
                <Image style={styles.image} source={require('../assets/images/FlyingBooksBackGround.png')}/>
                
                
            </View>

        </View>
    )
}

export default BookDetailScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-around',
    },
    buttonContainer: {
        marginTop: theme.spacing.l,
    }, textContainer: {
        paddingTop: '70%',
        paddingLeft: '10%%',
        paddingRight: '10%%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: theme.spacing.l,
        marginBottom: theme.spacing.m,
    }, imageTitle: {
        ...theme.textVariants.h1,
        color: theme.colors.white,
        
    },
    imageSubtitle: {
        ...theme.textVariants.body2,
        color: theme.colors.white
    }, button: {
        ...theme.button,
        backgroundColor: theme.colors.primary,
        width: 200,
    }, image: {
        marginTop: '20%',
        width: 400,
        height: 216.27,
    }
});
