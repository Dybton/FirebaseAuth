import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import theme from '../assets/themes'

const Separator = () => {
    return (
        <View style={styles.separator}>
            <Text></Text>
        </View>
    )
}

export default Separator

const styles = StyleSheet.create({
    separator:{
        marginTop: theme.spacing.m,
        marginHorizontal: theme.spacing.m,
        height: 1,
        backgroundColor: theme.colors.gray
    },
})
