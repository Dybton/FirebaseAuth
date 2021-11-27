import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import ReadingBooksComponent from '../components/ReadingBooksComponent';
import FinishedBooksComponent from '../components/FinishedBooksComponent';
import Books from './Books';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'

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
                <Text> Loading </Text>
            </ScrollView>
        </>
        );
    
}
    
};

export default UserBooksComponent

const styles = StyleSheet.create({})
