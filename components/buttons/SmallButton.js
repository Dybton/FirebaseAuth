import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import React from "react";


const SmallButton = ({ onPress, title, status }) => (
    <TouchableOpacity onPress={onPress} style={(status === false) ? styles.smallButtonContainer : styles.smallButtonContainerHighlighted}>
        <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity >
);


const styles = StyleSheet.create({
    smallButtonContainer: {
        marginTop: 1,
        backgroundColor: '#293D6E',
        width: '40%',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        borderColor: '#949EB7',
        borderWidth: 1,
    }, smallButtonContainerHighlighted: {
        backgroundColor: '#293D6E',
        width: '40%',
        padding: 13,
        borderRadius: 10,
        marginTop: 10,
        alignItems: 'center',
        borderColor: '#68E2B1',
        borderWidth: 3,
    }, buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    }
});

export default SmallButton;

