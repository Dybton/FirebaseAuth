import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import theme from '../assets/themes';
import React, { useState, useEffect} from 'react';

// Firebase
import { db, Timestamp } from '../firebase';
import firebase from 'firebase/app'
import 'firebase/firestore'

import { useNavigation } from '@react-navigation/native';

import FlipComponent from './FlipComponent';
import LargeButton from './buttons/LargeButton';
import StepIndicatorFunction from './StepIndicator';
import QuestionsFinished from '../screens/QuestionsFinished';

// Use props instead
const StudyCard = ({ question, answer, cardsToStudy, step, userID, cardID, getUserCards }) => {

    const navigation = useNavigation();
    const [isQuestion, setIsQuestion] = useState(true);
    const [middleSectionEnabled, setMiddleSectionEnabled] = useState(false);
    const [bottomSectionEnabled, setBottomSectionEnabled] = useState(false);
    const [leftButtonClicked, setLeftButtonClicked] = useState(false)
    const [rightButtonClicked, setRightButtonClicked] = useState(false)
    const [currentPosition, setCurrentPosition] = useState(step);

    useEffect(() => {
    getUserCards();
  }, [])

    const nextCard = () => {
        setMiddleSectionEnabled(false)
        setBottomSectionEnabled(false)
        setLeftButtonClicked(false)
        setRightButtonClicked(false)
        setIsQuestion(true)
        setCurrentPosition(step)
        updateUserCards();
        if (cardsToStudy == 1) {
            navigation.navigate("QuestionsFinished")
        }
    }

    // Helper function that determines when the user will see the card again. 
    const determineTimeStamp = () => {
        const today = new Date()
        const dateToReview = new Date(today);
        if (step == 0) {
            dateToReview.setDate(dateToReview.getDate() + 3)
        } if (step == 1) {
            dateToReview.setDate(dateToReview.getDate() + 10)
        } if (step == 3) {
            dateToReview.setDate(dateToReview.getDate() + 21)
        } if (step == 4) {
            // Temporary solution. The card should get deleted instead.
            dateToReview.setDate(dateToReview.getDate() + 1500)
        }
        const timestamp = firebase.firestore.Timestamp.fromDate(dateToReview)
        return timestamp;
    }

    // This is giving me a wierd error - Cont from here
    const updateUserCards = async () => {
        const cardDoc = userID + "_" + cardID;
        if (rightButtonClicked) {
            const userCardRef = db.collection('userCards').doc(cardDoc).update({
                step: currentPosition,
                nextReview: determineTimeStamp()
            }).then(function () {
                console.log("Step and nextReview updated")
                getUserCards();
            })
        } else {
            const userCardRef = db.collection('userCards').doc(cardDoc).update({
                step: currentPosition,
                nextReview: firebase.firestore.Timestamp.fromDate(new Date())
            }).then(function () {
                console.log("Step and nextReview updated")
                getUserCards();
            })
        }
    }

    // There's some refactoring to be done here
    const enableMiddle = () => {
        setMiddleSectionEnabled(true)
    }

    const enableBottom = () => {
        setBottomSectionEnabled(true)
        console.log('bottom true')
    }

    return (
        <View>
            <View>
                <FlipComponent isQuestion={isQuestion} setIsQuestion={setIsQuestion} question={question} answer={answer} enableMiddle={enableMiddle} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.imageSubtitle}> Did you remember?</Text>
            </View>
            <StepIndicatorFunction
                step={step}
                enableBottom={enableBottom}
                enabledStatus={middleSectionEnabled}
                leftButtonClicked={leftButtonClicked}
                rightButtonClicked={rightButtonClicked}
                setLeftButtonClicked={setLeftButtonClicked}
                setRightButtonClicked={setRightButtonClicked}
                currentPosition={currentPosition}
                setCurrentPosition={setCurrentPosition}
            />
            <View style={[styles.container, styles.buttonContainer]}>
                <LargeButton title={"Next Card (" + (cardsToStudy - 1) + " Cards Left)"} enabledStatus={bottomSectionEnabled} onPress={nextCard} />
            </View>
        </View >
    );
};

export default StudyCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-around',
    },
    buttonContainer: {
        marginTop: theme.spacing.l,
    },
    leftButton: {
        marginRight: 100,
    }, textContainer: {
        alignItems: 'center',
        marginTop: theme.spacing.l,
        marginBottom: theme.spacing.m
    }, imageTitle: {
        ...theme.textVariants.h1,
        color: theme.colors.white,
    },
    imageSubtitle: {
        ...theme.textVariants.body2,
        color: theme.colors.white
    }
});