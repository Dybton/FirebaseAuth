import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TouchableOpacityBase } from 'react-native';
import theme from '../assets/themes'

type Props = {
    cardQuestion: string;
}

const FlipCard = ({ content, isQuestion }) => {
    if (isQuestion) {
        return (
            <View style={styles.card}>
                <Text style={styles.cardText}> {content} </Text>
                <Text style={styles.clickToSeeAnswerText}> Try to recall. Then click to see answer </Text>
            </View>
        );
    } else {
        return (
            <View style={styles.card}>
                <Text style={styles.cardText}> {content} </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        marginTop: 96,
        width: 380,
        height: 330,
        borderColor: '#949EB7',
        backgroundColor: '#293D6E',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    cardText: {
        color: theme.colors.white,
        ...theme.textVariants.body2,
    },
    answerText: {
        color: theme.colors.white,
    }, clickToSeeAnswerText: {
        position: 'absolute',
        top: '85%',
        color: theme.colors.white,
        ...theme.textVariants.body2,
    }
});

export default FlipCard;