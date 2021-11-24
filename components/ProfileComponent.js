import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ProfileComponent = ({user}) => {
        return (
            <View>
                <Text>Welcome {user.name}</Text>
            </View>
        )}

export default ProfileComponent

const styles = StyleSheet.create({})
