import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";


const LargeButton = ({ onPress, title, enabledStatus }) => (
    <View pointerEvents={enabledStatus ? 'auto' : 'none'} style={(enabledStatus) ? styles.largeButtonContainer : styles.largeButtonContainerDisabled}>
        <TouchableOpacity>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    </View>
);


const styles = StyleSheet.create({
    largeButtonContainer: {
        backgroundColor: '#6290C3',
        width: '90%',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
    }, largeButtonContainerDisabled: {
        backgroundColor: '#6290C3',
        width: '90%',
        padding: 30,
        borderRadius: 10,
        alignItems: 'center',
        opacity: 0.5,
    }, buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
});

export default LargeButton;

