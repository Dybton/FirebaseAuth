import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TouchableOpacityBase, Animated, ScrollView, FlatList } from 'react-native';
import theme from '../assets/themes'
import { db, auth, Timestamp } from '../firebase';

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
  // states
  const [studyCards, setStudyCards] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    getUserCards();
    console.log("studycreen")
    
  }, [isLoaded])


  // // Filter the cards so only cards to be reviewed will be present
  // const filterCards = (Card) => {
  //   // Create a timestamp from TimeStamp. 
  //   const cardTime = Card.nextReview.toDate();
  //   const currentTime = firebase.firestore.Timestamp.fromDate(new Date()).toDate();
  //   if (currentTime > cardTime) {
  //     return Card;
  //   }
  // }
  // if (studyCards.length === 0) {
  //   console.log("studyCards is empty")
  // } else {
  //   // console.log(studyCards)
  // }

  // We need to use those to make a query to the cards to get questions and answers
  // The cards needs to be funneled into the studyScreen
  // Based on whether the user remembers them 

  const getUserCards = async () => {
    const userCardRef = await db.collection('userCards');
      const currentTime = firebase.firestore.Timestamp.fromDate(new Date())
      // we'll filter it locally, instead of using the firestore
      // we make an if statement that checks whether it's <= the current time. If so we set the state
    try {
      userCardRef.where("userID", "==", auth.currentUser.uid).onSnapshot(snapshot => {
        setStudyCards(snapshot.docs.map(doc => doc.data()));
        const arr = snapshot.docs.map(doc => doc.data());
        arr.forEach(card => {
          if(card.nextReview <= currentTime) {
            setStudyCards([...studyCards], card)
          }
        });
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


