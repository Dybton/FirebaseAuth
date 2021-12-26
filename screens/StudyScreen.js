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
      <View style={styles.container}>
        <FlipComponent />
        {/* <StepIndicatorFunction /> */}
      </View>
      <View style={styles.container}>
        <SmallButton title={"Yes"} style={styles.leftButton} />
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
    // alignItems: 'center',
    flexDirection: "row",
    justifyContent: 'space-around',
  },
  leftButton: {
    marginRight: 100,
  }
});

export default StudyScreen;


