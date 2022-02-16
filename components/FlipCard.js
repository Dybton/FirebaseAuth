import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TouchableOpacityBase } from 'react-native';
import theme from '../assets/themes'

// type Props = {
//     cardQuestion: string;
// }

const FlipCard = ({ question, answer, isQuestion }) => {
    if (isQuestion) {
        return (
            <View style={styles.card}>
                <View style={styles.textContainer}> 
                    <Text style={styles.cardText}>{question}</Text>
                </View>
                <Text style={styles.clickToSeeAnswerText}> Try to recall. Then click to see answer </Text>
            </View>
        );
    } if (!isQuestion) {
        return (
            <View style={styles.card}>
                <View style={styles.textContainer}> 
                    <Text style={styles.cardText}>{answer}</Text>
                </View>
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
    textContainer: {
        position: 'absolute',
        marginLeft: 20,
        marginRight: 20,

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