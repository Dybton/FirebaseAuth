import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TouchableOpacityBase, Animated, ScrollView, FlatList } from 'react-native';
import theme from '../assets/themes'
import { db, auth, Timestamp } from '../firebase';
import { useNavigation } from '@react-navigation/native';

import FlipComponent from '../components/FlipComponent';
import LargeButton from "../components/buttons/LargeButton";
import SmallButton from "../components/buttons/SmallButton";
import StepIndicatorFunction from '../components/StepIndicator';
import StudyCard from '../components/StudyCard';
import QuestionsFinished from './QuestionsFinished';

// Firebase
import firebase from 'firebase/app'
import 'firebase/firestore'

const StudyScreen = () => {
  const navigation = useNavigation();
  
  // states
  const [studyCards, setStudyCards] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    getUserCards();
  }, [isLoaded])

  const handlePress = () => {
    navigation.navigate("Home");
}

  // Try to place this in progress screen an make it a call
  const getUserCards = async () => {
    const userCardRef = await db.collection('userCards');
      const currentTime = firebase.firestore.Timestamp.fromDate(new Date())
    try {
      userCardRef.where("userID", "==", auth.currentUser.uid).onSnapshot(snapshot => {
        if(studyCards.length == 0) {
          setStudyCards(snapshot.docs.map(doc => doc.data()))
        } else {
          const arr = snapshot.docs.map(doc => doc.data());
          const cards = [];
          arr.forEach(card => {
            if(card.nextReview <= currentTime){
              cards.push(card)
            }
          });
          setStudyCards(cards)
        }
      })
      setIsLoaded(true)
    } catch (err) {
      alert(err)
    }
    console.log("getusercardsfunction")
  }


  // Timestamp nu - get all cards from now or earlier. - Problem is, this runs after the 
  // Se timestamp now.

  // const getUserCards = async () => {
  //   console.log("getusercardsfunction")
  //   const userCardRef = await db.collection('userCards');
  //   const currentTime = firebase.firestore.Timestamp.fromDate(new Date())
  //   try {
  //     userCardRef.where("nextReview", "<=", currentTime).where("userID", "==", auth.currentUser.uid).onSnapshot(snapshot => {
  //       setStudyCards(snapshot.docs.map(doc => doc.data()))
  //       // console.log(snapshot.docs.map(doc => doc.data()))
  //     })
  //     setIsLoaded(true)
  //   } catch (err) {
  //     alert(err)
  //   }
    
  // }

  // //collects the userCards
  // const getUserCards = async () => {
  //   const userCardRef = db.collection('userCards');
  //   try {
  //     const userCards = await userCardRef.where("userID", "==", auth.currentUser.uid).get();
  //     const studyCardArray = [];
  //     for (const doc of userCards.docs) {
  //       const data = doc.data();
  //       const filteredCard = filterCards(data);
  //       if (filteredCard !== undefined) {
  //         studyCardArray.push(filteredCard)
  //       }
  //       setStudyCards(studyCardArray);
  //     }
  //   } catch (err) {
  //     alert(err)
  //   } finally {
  //     setLoaded(true)
  //   }
  // }
  // if(studyCards.length === 0) {
  //   return(
  //     <View style={styles.container}> 
  //       <View style={styles.textContainer}>
  //           <Text style={styles.imageTitle}>Sorry, there are no cards for these pages. Return when you have read more </Text>
  //           <TouchableOpacity style={styles.button} onPress={handlePress}><Text style={styles.imageSubtitle}>Return to Home</Text></TouchableOpacity>
  //           <Image style={styles.image} source={require('../assets/images/FlyingBooksBackGround.png')}/>
  //       </View> 
  //       </View>
  //   )
  // } else {
  return (
    <View>
      <TouchableOpacity>
      </TouchableOpacity>
      <ScrollView
        scrollEnabled={false}
      >
        {
          studyCards.map(({ answer, question, nextReview, step, userID, cardID }) => (
            <StudyCard
              answer={answer}
              question={question}
              cardsToStudy={studyCards.length}
              step={step}
              nextReview={nextReview}
              userID={userID}
              cardID={cardID}
              getUserCards={getUserCards}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flexDirection: "row",
      justifyContent: 'space-around',
  },
  buttonContainer: {
      marginTop: theme.spacing.l,
  }, textContainer: {
      paddingTop: '70%',
      paddingLeft: '10%%',
      paddingRight: '10%%',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
      marginTop: theme.spacing.l,
      marginBottom: theme.spacing.m
  }, imageTitle: {
      ...theme.textVariants.h1,
      color: theme.colors.white,
      
  },
  imageSubtitle: {
      ...theme.textVariants.body2,
      color: theme.colors.white
  }, button: {
      ...theme.button,
      backgroundColor: theme.colors.primary,
      width: 300,
  }, image: {
      marginTop: '20%',
      width: 400,
      height: 216.27,
  }
});

export default StudyScreen;


