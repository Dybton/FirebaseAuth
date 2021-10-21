import React from 'react'
import { StyleSheet, Text, View } from 'react-native'


const SharedAlbums = ({route}) => {
    const album = route.params;

    console.log(album);

    return (
        <View style={styles.container}>
            <Text></Text>
        </View>
    )
}

export default SharedAlbums

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
