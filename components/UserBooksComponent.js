import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import ReadingBooksComponent from '../components/ReadingBooksComponent';
import FinishedBooksComponent from '../components/FinishedBooksComponent';
import Books from './Books';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'
import theme from '../assets/themes'


const UserBooksComponent = ({books, sender}) => {

    if (books !== undefined) {

    return (
    <> 
        <ScrollView>
            <Books books={books} sender={sender}/>
        </ScrollView>
    </>
    );
} else {
    return (
        <> 
            <ScrollView>
                <Text style={styles.imageTitle}> Loading</Text>
            </ScrollView>
        </>
        );
    
}
    
};

export default UserBooksComponent

const styles = StyleSheet.create({
    imageTitle: {
        ...theme.textVariants.h1,
        color: theme.colors.white,
      }
})


