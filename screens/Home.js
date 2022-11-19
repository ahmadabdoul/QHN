
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import About from './About';
import Logout from './Logout';
import TopNews from './TopNews';

const Drawer = createDrawerNavigator();

export default class Home extends Component {
    render() {
        return (
      
            <Drawer.Navigator initialRouteName="TopNews">
            <Drawer.Screen name="TopNews" component={TopNews} />
            <Drawer.Screen name="About" component={About} />
            <Drawer.Screen name="Logout" component={Logout} />
            </Drawer.Navigator>
        );
    }
    }



