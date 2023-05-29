import React, { useCallback, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Launches from "../Screen/Launches"
import LaunchDetail from "../Screen/LaunchDetail"
import { Launch } from '../preDefine';



export type MainStackParamList = {
  Launches: undefined;
  LaunchDetail: {
    launch:Launch
  };
};

const Stack = createStackNavigator<MainStackParamList>();

const MainStackNavigation: React.FunctionComponent = () => {
  return (
      <Stack.Navigator initialRouteName="Launches">
        {/* <Stack.Screen name="TestPage" component={TestPage}/> */}
        <Stack.Screen name="Launches" component={Launches} options={{ headerShown: false }}/>
        <Stack.Screen name="LaunchDetail" component={LaunchDetail} options={{ headerShown: false  }}/>

      </Stack.Navigator>
    );
 }

export default MainStackNavigation