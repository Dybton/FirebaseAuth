import { NavigationContainer, ThemeProvider } from '@react-navigation/native'
import React from 'react'
import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import theme from '../assets/themes'
import albumPage from '../assets/data/albumPage'
// This one needs to import data from firebase
import Card from './Card'
import Separator from './Separator'

const Albums = ({navigation}) => {
    return (
    <>
        <ScrollView>
            <View style={styles.albumContainer}>
                {albumPage.map((item, index) => 
                <View key={index}>
                    <Card item={item} navigation={navigation}/>
                </View>
                )} 

            </View>
        </ScrollView>
    </>
    );
};

export default Albums

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, 
    albumContainer: {
        marginBottom: theme.spacing.l


    }
})
