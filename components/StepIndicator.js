import StepIndicator from 'react-native-step-indicator';
import React, { useState } from "react";
import { Text, TouchableOpacity, Button, StyleSheet, View } from 'react-native';
import SmallButton from "../components/buttons/SmallButton";
import theme from '../assets/themes'

const StepIndicatorFunction = ({ parentFunc, enabledStatus }) => {
    const [leftButtonClicked, setLeftButtonClicked] = useState(false)
    const [rightButtonClicked, setRightButtonClicked] = useState(false)
    const [currentPosition, setCurrentPosition] = useState(0);
    const forgotAnswer = () => {
        (currentPosition > 0 ? setCurrentPosition(0) : null);
        setLeftButtonClicked(true)
        setRightButtonClicked(false)
        parentFunc()
    }
    const rememberAnswer = () => {
        (currentPosition < 7 ? setCurrentPosition(currentPosition + 1) : null);
        setLeftButtonClicked(false)
        setRightButtonClicked(true)
        parentFunc()
    }

    return (
        <View pointerEvents={enabledStatus ? 'auto' : 'none'} style={(enabledStatus) ? styles.enabledContainer : styles.disabledContainer}>

            <View style={styles.buttonsContainer}>
                <SmallButton title={"No"} status={leftButtonClicked} onPress={() => forgotAnswer()} />
                <SmallButton title={"Yes"} status={rightButtonClicked} onPress={() => rememberAnswer()} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.imageSubtitle}> You will see the card again in: </Text>
            </View>
            <View style={styles.stepIndicator}>
                <StepIndicator
                    stepCount={4}
                    customStyles={thirdIndicatorStyles}
                    currentPosition={currentPosition}
                    // we need to make these dynamic
                    labels={['0 Days', '3 Days', '7 Days', '14 Days']}
                />
            </View>
        </View>
    );
};

// Style for the StepIndicator
const thirdIndicatorStyles = {
    stepIndicatorSize: 28,
    currentStepIndicatorSize: 32,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: 'white',
    stepStrokeWidth: 2,
    renderStepIndicator: null,
    stepStrokeFinishedColor: '#68E2B1',
    stepStrokeUnFinishedColor: '#68E2B1',
    separatorFinishedColor: '#68E2B1',
    separatorUnFinishedColor: '#527BAF',
    stepIndicatorFinishedColor: '#68E2B1',
    stepIndicatorUnFinishedColor: '#68E2B1',
    stepIndicatorCurrentColor: '#68E2B1',
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#999999',
    labelSize: 12,
    labelAlign: 'center',
    currentStepLabelColor: '#7eaec4',
};

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: theme.spacing.m,
    },
    btnTxtWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, imageTitle: {
        ...theme.textVariants.h1,
        color: theme.colors.white,
    },
    imageSubtitle: {
        ...theme.textVariants.body2,
        color: theme.colors.white
    }, textContainer: {
        alignItems: 'center',
        marginBottom: theme.spacing.l,
    },
    disabledContainer: {
        opacity: 0.5,
    },
    enabledContainer: {},
});

export default StepIndicatorFunction;