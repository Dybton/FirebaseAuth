import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TouchableOpacityBase, Animated } from 'react-native';

import FlipComponent from '../components/FlipComponent';
import LargeButton from "../components/buttons/LargeButton";
import SmallButton from "../components/buttons/SmallButton";

// Firebase
import firebase from 'firebase/app'
import 'firebase/firestore'

const StudyScreen = () => {
  // states
  const [cards, setCards] = useState([]);
  const [studyCards, setStudyCards] = useState([]);

  function mjello() {
    console.log("mjello")
  }

  return (
    <View>
      <FlipComponent />
      {/* <StepIndicatorFunction /> */}

      <View style={styles.container}>
        <SmallButton title={"Yes"} />
        <SmallButton title={"No"} />
      </View>
      <View style={styles.container}>
        <LargeButton title={"Continue"} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: "row",
  }
});

export default StudyScreen;


