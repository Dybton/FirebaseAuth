import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import theme from '../assets/themes'
import bookPage from '../assets/data/bookPage'
// This one needs to import data from firebase
import Card from './Card'
import Separator from './Separator'
import { db } from '../firebase'

const Books = ({navigation, books}) => {

    return (
    <>
        <ScrollView>
            <View style={styles.bookContainer}>
                {books.map((item, index) => 
                <View key={index}>
                    <Card item={item} navigation={navigation}/>
                </View>
                )} 

            </View>
        </ScrollView>
    </>
    );
};

export default Books

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    bookContainer: {
        marginBottom: theme.spacing.l


    }
})
