import 'react-native-gesture-handler';
import React from 'react'
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, StatusBar, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

//import {StackNavigator, AnotherScreenNavigator} from './navigation/Navigator';
//import BottomTabNavigator from './navigation/BottomTabNavigator';
import DrawerNavigator from './src/Navigation/DrawerNavigator';

export default function App() {

  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
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

