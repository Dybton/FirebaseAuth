import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TouchableOpacityBase, Animated } from 'react-native';
import theme from '../assets/themes'


import FlipComponent from '../components/FlipComponent';
import LargeButton from "../components/buttons/LargeButton";
import SmallButton from "../components/buttons/SmallButton";
import StepIndicatorFunction from '../components/StepIndicator';


// Firebase
import firebase from 'firebase/app'
import 'firebase/firestore'

const StudyScreen = () => {
  // Once the card is clicked, the middle components are ungreyed, once you've pressed continue, the next card is ungreyed and clickable

  // states
  const [cards, setCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);
  const [middleSectionEnabled, setMiddleSectionEnabled] = useState(false);
  const [bottomSectionEnabled, setBottomSectionEnabled] = useState(false);

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


