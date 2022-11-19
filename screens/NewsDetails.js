//class component for NewsDetail
//compare this snippet from screens\TopNews.js

import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { navigationRef } from '../RootNavigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppLoader, { hideLoader, showLoader, loaderRef } from '../helpers/AppLoader';

export default class NewsDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            url: this.props.route.params.item.url,
        }
    }
componentDidMount() {
    showLoader();
    console.log(this.state.url)
}
    
    render() {
        
        return (
            <View style={styles.container}>

    <View style={{height:1500}}>
                <WebView
                    source={{ uri: this.state.url }}
                    onLoadStart={()=>{showLoader()}}
                    onLoadProgress={()=>{showLoader()}}
                    onLoadEnd={()=>{hideLoader()}}
                    style={{flex:1}}
                    automaticallyAdjustContentInsets={false}
                    startInLoadingState={true}
                />
                
                <AppLoader ref = { loaderRef }/>
                </View>
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
    button: {
        backgroundColor: "#007445",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
    },
        
});


