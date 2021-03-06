import React, { useRef, useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Animated, TouchableOpacity } from 'react-native';

import FlipCard from './FlipCard';

const FlipComponent = ({ setIsQuestion, isQuestion, enableMiddle, question, answer }) => {

  const animate = useRef(new Animated.Value(0));
  const [isFlipped, setIsFlipped] = useState(false);
  const handleFlip = () => {
    if (isQuestion) {
      setIsQuestion(false)
    } else {
      setIsQuestion(true)
    }
    enableMiddle();
    Animated.timing(animate.current, {
      duration: 200,
      toValue: isFlipped ? 0 : 180,
      useNativeDriver: true
    }).start(() => {
      setIsFlipped(!isFlipped);
    });
  };

  const interpolateFront = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const interpolateBack = animate.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <View>
      <TouchableOpacity onPress={handleFlip}>
        <View style={styles.container}>
          <Animated.View style={[{ transform: [{ rotateY: interpolateFront }] }, styles.hidden]}>
            <FlipCard
              question={question}
              answer={answer}
              isQuestion={isQuestion}
            />
          </Animated.View>
          <Animated.View style={[{ transform: [{ rotateY: interpolateBack }] }, styles.hidden, styles.back]}>
            <FlipCard
              question={question}
              answer={answer}
              isQuestion={isQuestion}
            />
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>


  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  hidden: {
    backfaceVisibility: 'hidden',
  },
  back: {
    position: 'absolute',
    top: 0,
  }
});

export default FlipComponent;