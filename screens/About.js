//class component About
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default class About extends Component {
    render() {
        return (
            <View style={styles.container}>
                 
            {/** card */}
            <Card>
    <Card.Title title="My Bio" subtitle="Brief Intro" left={LeftContent} />
    <Card.Content>
      <Title>About Me</Title>
      <Paragraph>My name is Ahmad Abdulkadir, a developer who has developed websites and applications for 4 years. Most of my experience lies in fullstack development and mobile app development. I have worked with HTML/CSS, Javascript, PHP, React Native.</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
   
  </Card>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
