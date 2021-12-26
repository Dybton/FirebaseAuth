import React from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import theme from '../assets/themes'
import { useNavigation } from '@react-navigation/native';

const Card = ({ item, user, parentFunc }) => {
    const navigation = useNavigation();

    return (
        <ImageBackground
            source={item.background}
            style={styles.ImageBackground}
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
