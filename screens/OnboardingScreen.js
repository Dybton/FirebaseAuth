import React from 'react'
import { Button, StyleSheet, Text, View, Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper';

const OnboardingScreen = ({ navigation }) => {
  return (
    <Onboarding
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: '#132961',
          image: <Image style={styles.image} source={require('../assets/images/Wizard1.png')} />,
          title: '',
          subtitle: '',
        },
        {
          backgroundColor: '#132961',
          image: <Image style={styles.image} source={require('../assets/images/Wizard2.png')} />,
          title: '',
          subtitle: '',
        },
        {
          backgroundColor: '#132961',
          image: <Image style={styles.image} source={require('../assets/images/Wizard3.png')} />,
          title: '',
          subtitle: '',
        },
        {
          backgroundColor: '#132961',
          image: <Image style={styles.image} source={require('../assets/images/Wizard4.png')} />,
          title: '',
          subtitle: '',
        },
      ]}
    />
  )
}

export default OnboardingScreen;

const styles = StyleSheet.create({
  image: {
    marginTop: 62,
    height: 600,
    width: 375,
    // borderWidth: 2,
  }
})
