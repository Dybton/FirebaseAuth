import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import ReadingBooksComponent from '../components/ReadingBooksComponent';
import FinishedBooksComponent from '../components/FinishedBooksComponent';
import Card from './Card';

const UserBooksComponent = ({user, books}) => {

    // const finishedBooks = user[0].read;

    // const hat = books.find(x => x.title === finishedBooks[0])
    // console.log(hat)

    // How do I get the objects, where the title is in finishedBooks?

    return (
        <View>
            <Text></Text>
            {/* Both of these needs to be equivalent to the books */}
            <ReadingBooksComponent user={user} books={books}/>
            <FinishedBooksComponent user={user} books={books}/>
        </View>
    )
}

export default UserBooksComponent

const styles = StyleSheet.create({})
