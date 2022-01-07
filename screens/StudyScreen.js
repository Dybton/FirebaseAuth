import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TouchableOpacityBase, Animated } from 'react-native';
import theme from '../assets/themes'
import { db, auth, Timestamp } from '../firebase';

import FlipComponent from '../components/FlipComponent';
import LargeButton from "../components/buttons/LargeButton";
import SmallButton from "../components/buttons/SmallButton";
import StepIndicatorFunction from '../components/StepIndicator';

// Firebase
import firebase from 'firebase/app'
import 'firebase/firestore'


const StudyScreen = () => {
  // states
  const [studyCards, setStudyCards] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [middleSectionEnabled, setMiddleSectionEnabled] = useState(false);
  const [bottomSectionEnabled, setBottomSectionEnabled] = useState(false);


  useEffect(() => {
    getUserCards();
  }, [Loaded])

  // Filter the cards so only cards to be reviewed will be present
  const filterCards = (Card) => {
    const cardTime = Card.nextReview.toDate();
    const currentTime = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
    if (currentTime > cardTime) {
      return Card;
    }
  }


  // We need to use those to make a query to the cards to get questions and answers
  // The cards needs to be funneled into the studyScreen
  // Based on whether the user remembers them 


  //collects the userCards
  const getUserCards = async () => {
    const userCardRef = db.collection('userCards');
    try {
      const userCards = await userCardRef.where("userID", "==", auth.currentUser.uid).get();
      const studyCardArray = [];
      for (const doc of userCards.docs) {
        const data = doc.data();
        studyCardArray.push(filterCards(data))
        setStudyCards(studyCardArray);
      }
    } catch (err) {
      alert(err)
    } finally {
      setLoaded(true)
      if (Loaded) {
        console.log(studyCards)
      }
    }
  }

  // function that sets middle section
  const enableMiddle = () => {
    setMiddleSectionEnabled(true)
  }

  const enableBottom = () => {
    setBottomSectionEnabled(true)
    console.log('bottom true')
  }

  // pass the function to flipcomponent


  return (
    <View>
      <View style={styles.container}>
        <FlipComponent parentFunc={enableMiddle} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.imageSubtitle}> Did you remember?</Text>
      </View>
      <StepIndicatorFunction enabledStatus={middleSectionEnabled} parentFunc={enableBottom} />
      <View style={[styles.container, styles.buttonContainer]}>
        <LargeButton enabledStatus={bottomSectionEnabled} title={"Next Card (54 Cards Left)"} />
      </View>
    </View >
  );
};

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

export default StudyScreen;


