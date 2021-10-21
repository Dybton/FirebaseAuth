import React from 'react'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { withSafeAreaInsets } from 'react-native-safe-area-context'
import theme from '../assets/themes'

// const Card = ({item, navigation}) => {
    const Card = ({item, navigation}) => {
        return (
            <ImageBackground
                source={item.background}
                style={styles.ImageBackground}
            >
                <Pressable onPress={() => navigation.navigate('Shared Album', {album: item})}>
                    <View style={styles.imageContentContainer}>
                        <Text style={styles.imageTitle}> {item.title} </Text>
                        <Text style={styles.imageSubtitle}> {`Created by ${item.user}`} </Text>
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
// imageTitle: {
//     ...theme.textVariants.h1,
//     color: theme.colors.white,
// },
// imageSubtitle: {
//     ...theme.textVariants.body2,
//     color: theme.colors.white
// }

})
