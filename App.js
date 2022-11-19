
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from './screens/Splash';

import Home from './screens/Home'

import Login from './screens/Login'
import NewsDetails from './screens/NewsDetails';


import { navigationRef } from './RootNavigation';
import Register from './screens/Register';

const Stack = createStackNavigator();

export default function App() {
  
  return (

    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
    headerShown: false
  }}
      >

      <Stack.Screen
        name="Splash"
        component={Splash}

      />

       <Stack.Screen
        name="Home"
        component={Home}

      />
      
      <Stack.Screen
        name="Login"
        component={Login}

      />
      <Stack.Screen
        name="Register"
        component={Register}

      />
      

      <Stack.Screen
        name="NewsDetails"
        component={NewsDetails}
        
      />
     
     </Stack.Navigator>

    </NavigationContainer>
    
  );
}
