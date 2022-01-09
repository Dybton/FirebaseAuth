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
  const [cardIndex, setCardIndex] = useState(0);
  const [studyCards, setStudyCards] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [fun, setFun] = useState([]);
  const [middleSectionEnabled, setMiddleSectionEnabled] = useState(false);
  const [bottomSectionEnabled, setBottomSectionEnabled] = useState(false);

  useEffect(() => {
    getUserCards();
    getUserCards2();
  }, [])

  // Filter the cards so only cards to be reviewed will be present
  const filterCards = (Card) => {
    // Create a timestamp from TimeStamp. 
    const cardTime = Card.nextReview.toDate();
    const currentTime = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
    if (currentTime > cardTime) {
      return Card;
    }
  }
  if (studyCards.length === 0) {
    console.log("studyCards is empty")
  } else {
    // console.log(studyCards)
  }


  // We need to use those to make a query to the cards to get questions and answers
  // The cards needs to be funneled into the studyScreen
  // Based on whether the user remembers them 

  const getUserCards2 = async () => {
    const userCardRef = db.collection('userCards');
    const currentTime = firebase.firestore.Timestamp.fromDate(new Date())
    try {
      userCardRef.where("nextReview", "<=", currentTime).where("userID", "==", auth.currentUser.uid).onSnapshot(snapshot => {
        setFun(snapshot.docs.map(doc => doc.data()))
      })
    } catch (err) {
      alert(err)
    } finally {
      setLoaded(true)
    }
  }

  //collects the userCards
  const getUserCards = async () => {
    const userCardRef = db.collection('userCards');
    try {
      const userCards = await userCardRef.where("userID", "==", auth.currentUser.uid).get();
      const studyCardArray = [];
      for (const doc of userCards.docs) {
        const data = doc.data();
        const filteredCard = filterCards(data);
        if (filteredCard !== undefined) {
          studyCardArray.push(filteredCard)
        }
        setStudyCards(studyCardArray);
      }
    } catch (err) {
      alert(err)
    } finally {
      setLoaded(true)
    }
  }

  // function that sets middle section
  // There's some refactoring to be done here
  const enableMiddle = () => {
    setMiddleSectionEnabled(true)
  }

  const enableBottom = () => {
    setBottomSectionEnabled(true)
    console.log('bottom true')
  }

  const incrementIndex = () => {
    setCardIndex(cardIndex + 1)
    // setMiddleSectionEnabled(false)
    // setBottomSectionEnabled(false)
    // console.log("button")
  }

  return (
    <View>
      <View style={styles.container}>
        {
          (studyCards.length !== 0) ?
            <FlipComponent enableMiddle={enableMiddle} question={studyCards[cardIndex].question} answer={studyCards[cardIndex].answer} /> :
            <FlipComponent enableMiddle={enableMiddle} question="" answer="" />
        }
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.imageSubtitle}> Did you remember?</Text>
      </View>
      <StepIndicatorFunction enabledStatus={middleSectionEnabled} enableBottom={enableBottom} />
      <View style={[styles.container, styles.buttonContainer]}>
        <LargeButton enabledStatus={bottomSectionEnabled} title={studyCards.length} onPress={() => incrementIndex()} />
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


