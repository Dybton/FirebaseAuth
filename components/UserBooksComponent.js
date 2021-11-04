import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import ReadingBooksComponent from '../components/ReadingBooksComponent';
import FinishedBooksComponent from '../components/FinishedBooksComponent';
import Books from './Books';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'

const UserBooksComponent = ({books}) => {
    
    if (books !== undefined) {

    return (
    <> 
        <ScrollView>
            <Books books={books}/>
        </ScrollView>
    </>
    );
} else {
    return (
        <> 
            <ScrollView>
                <Text> Test </Text>
            </ScrollView>
        </>
        );
    
}
    
};

export default UserBooksComponent

const styles = StyleSheet.create({})
