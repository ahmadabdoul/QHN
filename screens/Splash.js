import React, { Component } from 'react'

import {  View,
        Platform,
         Image,
          } from 'react-native'
import { createTable, openDatabase, errorCB }  from './../helpers/localdb'
import store from 'react-native-simple-store';

export default class Splash extends Component {
  constructor(props) {
        super(props);
        this.state = {
                email: '',
                
            }
            /*
              this.handleChange = this.handleChange.bind(this);
                  this.handleSubmit = this.handleSubmit.bind(this);
            */
    };

  componentDidMount() {
    
    const db = openDatabase();
    createTable();


    store.get("user").then((user) => {
      console.log(user)
      //check if user is not null
      if(user != null){
        //check if user is loggedIn is true
        user.loggedIn ? setTimeout(() => this.props.navigation.replace('Home'), 2000) : setTimeout(() => this.props.navigation.replace('Login'), 2000)
        
        
         }else{
        //navigate to login after 2 seconds
           setTimeout(() => this.props.navigation.replace('Login'), 2000) 
           }
   
    }).catch((error) => {
      console.log(error)
    })
      

  }
    render() {
      


          return(
        
        <View style={{flex:1,backgroundColor:'white'}}>
         
     <Image
        style={{width:350,height:80, alignItems:'center', justifyContent:'center', marginTop:'90%'}}
        source={require('./../assets/logo.png')}
        resizeMode="center"
              />
        
      </View>
          
      );
    }
  }
