import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import theme from '../assets/themes';
import { useNavigation } from '@react-navigation/native';

const QuestionsFinished = () => {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate("Home");
    }

    return (
        <View style={styles.container}> 
        <View style={styles.textContainer}>
            <Text style={styles.imageTitle}>Congratulations! You have finished all cards for today</Text>
            <TouchableOpacity style={styles.button} onPress={handlePress}><Text style={styles.imageSubtitle}>Return to Home</Text></TouchableOpacity>
            <Image style={styles.image} source={require('../assets/images/FlyingBooksBackGround.png')}/>
        </View> 
        </View>
    )
};

export default QuestionsFinished;

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
        marginBottom: theme.spacing.m
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
        width: 300,
    }, image: {
        marginTop: '20%',
        width: 400,
        height: 216.27,
    }
});
