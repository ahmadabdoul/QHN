import React, { Component } from 'react';
import {
    SafeAreaView,
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Keyboard,
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Alert,
    TextInput,
    Button

} from 'react-native';
import AppLoader, { hideLoader, showLoader, loaderRef } from '../helpers/AppLoader';
 import { saveAuth, openDatabase, createTable } from "./../helpers/localdb";
import * as RootNavigation from "./../RootNavigation";
import store from 'react-native-simple-store';
class Register extends Component {

  constructor(props) {
      super(props);

      this.state = {
              email: '',
              password: '',
              loading: false,
              
          }
          /*
            this.handleChange = this.handleChange.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
          */
  };


  componentDidMount(){
    openDatabase();
    createTable();
    //this.register();
  }

  handleLogin() {
      RootNavigation.navigate('Login');
      //this.props.navigation.navigate('Staff');
  }


  handleEmailChange(event) {
      this.setState({ email: event.target.value });
      //alert(this.state({email}));
  }
  handlePasswordChange(event) {
      this.setState({ password: event.target.value });
      
      //alert(this.state({password}));
  }

  register = () => {
    console.log(this.state)
    const { email, password } = this.state;
    //check if email and password are empty
    if (email == '' || password == '') {
        Alert.alert('Warning', 'Please fill all fields');
        return;
    }
    showLoader();
    //check if saveAuth is true
    //console.log(saveAuth(email, password));
    if(saveAuth(email, password)){
        hideLoader();
        //console.log(saveAuth(email, password));
      
        Alert.alert('Success', 'Registration successful');
        RootNavigation.navigate('Home');
    }else{
        hideLoader();
        Alert.alert('Error', 'Registration failed');
    }
}




    render() {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
       
          <Image
            style={{ flex: 1, width: null, marginTop: -400 }}
            source={require('./../assets/logo.png')}
          />
          
         
          
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.loginText}>Register</Text>
          <View style={styles.inputView}>
           
            <TextInput
              style={styles.input}
              placeholder='Username'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              onChangeText = { email => this.setState({ email }) }
            />
          </View>
          <View style={styles.inputView}>
           
            <TextInput
              style={styles.input}
              placeholder='Password'
              secureTextEntry={true}
              autoCapitalize='none'
              onChangeText = { password => this.setState({ password }) }
            />
          </View>
         <Button title="Register" onPress={this.register} />

                 <Text style={styles.registerText}>
            Already have an account?
            <TouchableOpacity style={styles.registerText} onPress = { this.handleLogin }>
            <Text style={{ color: '#007445', fontSize:14 }}>
              {'Login'}
            </Text>
            </TouchableOpacity>
          </Text>
          <AppLoader ref = { loaderRef }/>
        </View>
       
      </View>
    </TouchableWithoutFeedback>
        );

    }
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      titleText: {
        position: 'absolute',
        top: Dimensions.get('screen').height * 0.1,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 60,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
      },
      bottomView: {
        backgroundColor: '#fff',
        opacity: 0.95,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 10,
        paddingBottom: 20,
        paddingHorizontal: 20,
      },
      loginText: {
        fontSize: 24,
        marginTop: 12,
        marginBottom: 4,
      },
      inputView: {
        height: 40,
        borderRadius: 10,
        backgroundColor: '#f1f3f6',
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
      },
      inputIcon: {
        paddingHorizontal: 8,
      },
      input: {
        height: 40,
        flex: 1,
        fontSize: 16,
        color: '#333',
      },
      loginButton: {
        backgroundColor: '#007445',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
      },
      loginButtonText: {
        color: '#fff',
        alignSelf: 'center',
        fontSize: 18,
      },
      registerText: {
        alignSelf: 'center',
        marginTop: 10,
        fontSize: 16,
      },
      fpText: {
        marginTop: 10,
        alignSelf: 'flex-end',
        fontSize: 16,
        color: '#007445',
      },
});
