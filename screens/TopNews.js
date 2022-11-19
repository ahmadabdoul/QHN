//class component with flatlist
import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import * as RootNavigation from '../RootNavigation';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AppLoader, { loaderRef } from '../helpers/AppLoader';
import * as WebBrowser from 'expo-web-browser';


export default class TopNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            result: '',
            dataSource: [],
            topNews: []
        }
    }
    componentDidMount() {
        //fetch news from https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
            .then((response) => response.json())
            .then((responseJson) => {
            this.setState({topNews: responseJson})


            //get the top 10 news
            let top10 = responseJson.slice(0, 10);
            //get the news details
            let promises = top10.map((id) => {
                return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                .then((response) => response.json())
            });
            //wait for all promises to resolve
            Promise.all(promises).then((results) => {
                this.setState({
                isLoading: false,
                dataSource: results,
                });
            }
            );
            })
            .catch((error) => {
            console.log(error);
            Alert.alert('Warning', 'Something went wrong ' + error);
            }
            );
    }
    _handleNewsDetails = async (url) => {
        let result = await WebBrowser.openBrowserAsync(url);
        this.setState({ result });
      };
    handleLoadMore = () => {
        this.setState({isLoading: true});
        //get the next 10 news
        let next10 = this.state.topNews.slice(this.state.dataSource.length, this.state.dataSource.length + 10);
        //get the news details
        let promises = next10.map((id) => {
            return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
            .then((response) => response.json())
        });
        //wait for all promises to resolve
        Promise.all(promises).then((results) => {
            this.setState({isLoading: false});
            this.setState({
            dataSource: [...this.state.dataSource, ...results],
            });

        }
        );
    }
    render() {
        if (this.state.isLoading) {
            return (
            <View style={styles.container}>
                <ActivityIndicator animating={this.state.isLoading} size={'large'} />
            </View>
            );
        }
        return (
            <View style={styles.container}>
   


                <FlatList
                    data={this.state.dataSource}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => this._handleNewsDetails(item.url)}>
                            <View style={styles.item}>
                                
                                <Text style={styles.title}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={({ id }, index) => id}
                    onEndReachedThreshold={0.5}
                    onEndReached={this.handleLoadMore}
                />
                <ActivityIndicator animating={this.state.isLoading} size={'large'} />
                <AppLoader ref = { loaderRef }/>
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
    item: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 18,
    },
    
});
