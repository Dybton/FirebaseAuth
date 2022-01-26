import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: '#fff',
          title: 'Onboarding',
          // Image
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          title: 'Onboarding',
          // Image
          subtitle: 'Done with React Native Onboarding Swiper',
        },
        {
          backgroundColor: '#fff',
          title: 'Onboarding',
          // Image
          subtitle: 'Done with React Native Onboarding Swiper',
        }
      ]}
    />
  )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
