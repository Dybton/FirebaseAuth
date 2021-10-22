import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LoginMethod, auth, db} from './firebase';

// Importing React Navigation V5
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Async
import {AsyncStorage } from 'react-native';

// Import Fonts, icons and themes
// import Feather from '@expo/vector-icons/Feather'
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { DefaultTheme } from '@react-navigation/native';

//Import Screens
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoadingScreen from './screens/LoadingScreen';
import ProfileScreen from './screens/ProfileScreen';
import StudyScreen from './screens/StudyScreen'
import ProgressScreen from './screens/ProgressScreen';
import BookDetailScreen from './screens/BookDetailScreen';

// Create Navigators
const OnboardingStack = createNativeStackNavigator();
const LoginStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const StudyStack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

// The theme we'll be using for our navigator
// can be used to set the general theme
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#FAFAFA'
  },
};


export default function App() {
  // Async Storage States 
  const [isFirstLaunch, setIsFirstLaunch] = useState('')
  const [statusKeyLoaded, setStatusKeyLoaded] = useState(false)
  

  // Every time page loads it checks if it's first launch or not.
  useEffect(() => {
    checkIfFirstLaunch();
  }, []);

  // Async Storage Methods
  async function checkIfFirstLaunch() {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true')
        setIsFirstLaunch(true);
        setStatusKeyLoaded(true)
      } else {
        setIsFirstLaunch(false)
        setStatusKeyLoaded(true)
      }
    });
  }

  //Keeping this in the case I need clear Async Storage 
  const remove = async () => {
    try {
      await AsyncStorage.removeItem('alreadyLaunched')
    } catch(err)  {
      alert(err)
    }
  }

  // Condition for the different navigators.
  if ( statusKeyLoaded === false ) {
    return (
      null 
    )
  } else if ( isFirstLaunch === null ) {
    return null;
  } else if(isFirstLaunch === true ) {
    return (
      // OnboardingStack:
      // Refactor this so there's no duplicate code
      <NavigationContainer theme={MyTheme}>
        <OnboardingStack.Navigator initialRouteName={OnboardingScreen} screenOptions={{headerShown: false }}>
          <OnboardingStack.Screen name="Onboarding" component ={OnboardingScreen} />
          <OnboardingStack.Screen name="Loading" component={LoadingScreen} />
          <OnboardingStack.Screen name="Login" component={LoginScreen} />
          <OnboardingStack.Screen name="HomeTab" component={TabsScreen}/>
        </OnboardingStack.Navigator>
      </NavigationContainer>

    );
  } else {
    return (
      // LoginStack
      // Refactor this so there's no duplicate code
      <NavigationContainer theme={MyTheme}>
        <LoginStack.Navigator initialRouteName={LoadingScreen} screenOptions={{headerShown: false }}>
          <LoginStack.Screen name="Loading" component={LoadingScreen}/>
          <LoginStack.Screen name="Login" component={LoginScreen} />
          <LoginStack.Screen name="HomeTab" component={TabsScreen} />
        </LoginStack.Navigator>
      </NavigationContainer>
    )
  }
}

  // Create the Tab Screen navigation. 
  // To do: Get find new icons
  function TabsScreen() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks();
    },[])

    const getBooks = () => {
        db.collection('books').onSnapshot(snapshot => (
            setBooks(
                snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
        ))
    }

    return (
      <Tabs.Navigator>
      <Tabs.Screen
        name="Home"
        options={{ headerShown: false }}
        children={()=><HomeStackScreen books={books}/>}
        
      />
      <Tabs.Screen
        name="Study"
        component={StudyStackScreen}
        // options={{ headerShown: false }}
      />
      <Tabs.Screen
        name="Profile"
        children={()=><ProfileScreen books={books}/>}
        // options={{ headerShown: false }}
      />
    </Tabs.Navigator>
    );
  }

  // This navigator handles the home and book part
  function HomeStackScreen({books}) {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen 
            name="HomeStack" 
            children={()=><HomeScreen books={books}/>}
            />
        <HomeStack.Screen name="Book Detail" component={BookDetailScreen} />
      </HomeStack.Navigator>
    );
  }
  
  // This navigator handles the study part
  function StudyStackScreen() {
    return (
      <StudyStack.Navigator>
        <StudyStack.Screen name="Progress" component={ProgressScreen} />
        <StudyStack.Screen name="StudyQuestions" component={StudyScreen}/>
      </StudyStack.Navigator>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});