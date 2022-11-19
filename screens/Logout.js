import { StackActions } from '@react-navigation/native';
import React, { Component, useEffect }  from 'react';
import { AppRegistry,
         StyleSheet,
         Text,
         View,
         TextInput,
         StatusBar,
         Keyboard,
         TouchableWithoutFeedback,
         TouchableOpacity,
         Alert,
         ActivityIndicator,
         FlatList,
         Image,
         Pressable,
         Platform,
    
         Dimensions,
         Linking


        } from 'react-native';
import { Button } from 'react-native-paper';
    
import AppLoader, { showLoader, loaderRef, hideLoader } from '../helpers/AppLoader';
import * as RootNavigation from './../RootNavigation';
import * as store from 'react-native-simple-store';
export default class Logout extends Component {
    constructor(props){
        super(props)
        this.state ={
            email:''
        }
    }


    
    DelAuth = () =>{
     //get user array from store
      store.get('user').then((user) => {
        //make a copy 
        user = user;
        //delete user array from the store
        store.delete('user');
        //save it with in the store with updatetd loggedIn status
        store.save('user', {email: user.email, password: user.password, loggedIn: false}).then(() => {
          //navigate to login screen
         this.props.navigation.dispatch(StackActions.replace('Login'));
        });
         

        });
      
      }
    render() {
  return (
        <View style={styles.MainContainer}>
            <View>
                <Text style={styles.text}>Are you sure you want to logout?</Text>
            </View>
            <View style={styles.buttonContainer}>
            <Button style={styles.logoutButton} textColor={'white'} onPress={this.DelAuth}>Yes</Button>
            <Button style={styles.logoutButton} textColor={'white'} onPress={()=>{
              this.props.navigation.goBack();
            }}>
              No
              </Button>
                
            </View>
           

            <AppLoader ref = { loaderRef }/>
        </View>  
      
    
  );

}

}

const styles = StyleSheet.create({
  MainContainer :{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginTop: (Platform.OS === 'ios') ? 0 : 0,
    width: '100%',
 
},
buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20
},
mapCon: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
logoutButton: {
    backgroundColor: '#007445',
    paddingVertical: 8,
    borderRadius: 9,
    marginBottom: 20,
    marginBottom: 14,
    marginLeft: 10,
    marginRight:10,
    color: 'white'
},
map: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
},
sliderContainer: {
  height: 650,
  width: '80%',
  marginTop: 10,
  justifyContent: 'center',
  alignSelf: 'center',
  borderRadius: 8,

},
wrapper: {},

slide: {
  flex:1,
  flexDirection:'column',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  borderRadius: 8,
},
sliderImage: {
  height: '100%',
  width: '100%',
  alignSelf: 'center',
  borderRadius: 15,

},

TextInputStyleClass: {

textAlign: 'center',
marginBottom: 7,
height: 40,
borderWidth: 1,
// Set border Hex Color Code Here.
borderColor: '#2196F3',

// Set border Radius.
borderRadius: 5 ,

},

imageView: {
 
    width: '50%',
    height: 100 ,
    margin: 7,
    borderRadius : 7
 
},
 
textView: {
 
    width:'50%', 
    textAlignVertical:'center',
    padding:10,
    color: '#000'
 
},
 

TextComponentStyle: {
 fontSize: 20,
color: "#000",
textAlign: 'center',
marginBottom: 15
},
categoryContainer: {
  flexDirection: 'row',
  width: '90%',
  alignSelf: 'center',
  marginTop: 25,
  marginBottom: 10,
},
categoryBtn: {
  flex: 1,
  width: '30%',
  marginHorizontal: 0,
  alignSelf: 'center',
},
categoryIcon: {
  borderWidth: 0,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
  width: 70,
  height: 70,
  backgroundColor: '#4ede4f',
  borderRadius: 50,
},
categoryBtnTxt: {
  alignSelf: 'center',
  marginTop: 5,
  color: '#4ede4f',
},

});
