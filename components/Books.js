import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import theme from '../assets/themes'
import Card from './Card'
import ProfileCard from './ProfileCard'
import Separator from './Separator'

const Books = ({ navigation, books, sender, user, parentFunc }) => {

    if (sender == 'profile') {
        return (
            <>
                <ScrollView>
                    <View style={styles.bookContainer}>
                        {books.map((item, index) =>
                            <View key={index}>
                                <ProfileCard item={item} />
                            </View>
                        )}

                    </View>
                </ScrollView>
            </>
        );
    } else {
        return (
            <>
                <ScrollView>
                    <View style={styles.bookContainer}>
                        {books.map((item, index) =>
                            <View key={index}>
                                <Card item={item} navigation={navigation} user={user} parentFunc={parentFunc} />
                            </View>
                        )}

                    </View>
                </ScrollView>
            </>
        );
    }
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
