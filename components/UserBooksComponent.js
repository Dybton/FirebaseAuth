import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ReadingBooksComponent from '../components/ReadingBooksComponent';
import FinishedBooksComponent from '../components/FinishedBooksComponent';

const UserBooksComponent = ({user}) => {
    return (
        <View>
            <Text></Text>
            <ReadingBooksComponent user={user}/>
            <FinishedBooksComponent user={user}/>
        </View>
    )
}

export default UserBooksComponent

const styles = StyleSheet.create({})
