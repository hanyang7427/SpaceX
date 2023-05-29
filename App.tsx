import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { OsmiProvider } from "osmicsx";
import { NavigationContainer } from '@react-navigation/native';
import MainStackNavigation from './src/Navigation/MainStackNavigation';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

export default function App() {
  return (
    <OsmiProvider>
      <NavigationContainer>
          <MainStackNavigation/>
          {/* <StatusBar style="auto" /> */}
      </NavigationContainer>
    </OsmiProvider>
  );
}