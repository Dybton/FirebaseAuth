import React, { useState, useEffect } from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import theme from '../assets/themes'
import { useNavigation } from '@react-navigation/native';

const Card = ({ item, user, parentFunc }) => {
    const navigation = useNavigation();
    const [isReading, setIsReading] = useState(false)

    useEffect(() => {
        checkIfReading();
      }, [])

    
    const checkIfReading = () => {
        if(user.reading !== undefined) {
            const userBooks = user.reading;
            userBooks.forEach(element => {
                if(element.title === item.title) {
                    console.log(item.title)
                    setIsReading(true)
                }
            });
        }
    }

    return (
        <ImageBackground
            source={item.background}
            style={isReading ? [styles.ImageBackground, styles.markedBackground] : styles.ImageBackground}
            // <Text style={[styles.red, styles.big]}>Big red</Text>
        >
            <Pressable onPress={() => navigation.navigate("Book Detail", {
                book: item,
                user: user,
                parentFunc: parentFunc,

            })}>
                <View style={styles.imageContentContainer}>
                    <Text style={styles.imageTitle}> {item.title} </Text>
                    <Text style={styles.imageSubtitle}> {`Written by ${item.author}`} </Text>
                </View>
            </Pressable>
        </ImageBackground>
    )
}

export default Card

const styles = StyleSheet.create({
    ImageBackground: {
        resizeMode: 'cover',
        overflow: 'hidden',
        height: theme.imageHeight.s,
        marginTop: theme.spacing.m,
        marginHorizontal: theme.spacing.m,
        paddingHorizontal: theme.spacing.m,
        borderRadius: theme.borderRadius.m,
        justifyContent: 'center' // Justify content centers vertically, relative to whatever something is inside
    },
    markedBackground: {
        backgroundColor: "#D5D6DB",
    },
    imageContentContainer: {
    },
    imageTitle: {
        ...theme.textVariants.h1,
        color: theme.colors.white,
    },
    imageSubtitle: {
        ...theme.textVariants.body2,
        color: theme.colors.white
    }
})
