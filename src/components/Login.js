import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, ToastAndroid,
        AsyncStorage, Dimensions, ActivityIndicator } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/Ionicons';

import { ip }  from './Variables';

import firebase from 'firebase';
import 'firebase/firestore';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const appFont = 'Poppins';

class Login extends Component {

    static navigationOptions = {
        header: null,
        drawerIcon: () => (<MaterialIcon name='person' size={26} color='#ff0055' />),
    }

    state = {
        email: '',
        isEmail: false,
        password: '',
        isPassword: false,
        showPassword: false,
        error: '',
        loading: false,
        type: '',
    };

    componentDidMount(){
        console.log(ip);

        // AsyncStorage.getItem('userCredentials').then(value => {
        //     console.log('this is userCredentials ' +value);
        //     this.setState({ 
        //         email: value.email,
        //         password: value.password
        //      })
        // }).catch(error => {
        //     console.log(error);
        // })

        // this.handleLogin();

        // firebase.auth().onAuthStateChanged(user => {
            // console.log('this is current user ' +user);
            // if(user)
            // {
                // AsyncStorage.getItem('type').then(type => {
                // console.log('this is type of user ' +type);

                //     if(type == 'Seller')
                //     {
                //         this.props.navigation.navigate('Seller');
                //     }
                //     else if(type == 'Rider')
                //     {
                //         this.props.navigation.navigate('Rider');
                //     }

                // }).catch(error => {
                //     console.log(error);
                // })
            // }

            // this.props.navigation.navigate(user ? 'Seller' : 'Login')
            // console.log('this user is logged in ' + JSON.stringify(user));
        // })
    }

    handleLogin = () => {
        
        this.setState({ loading: true });

        const { email, password } = this.state;

        if(email == ''|| password == '')
        {
            this.setState({ 
                error: 'Please Enter All Values!',
                loading: false,
            });

            ToastAndroid.showWithGravity(
                this.state.error,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        else
        {
            fetch(ip + 'login',{
                method: 'POST',
                body: JSON.stringify({
                    "email": email.toLowerCase(),
                    "password": password,
                }),
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then((response) => response.json()).then(responseJson => {
                
                // AsyncStorage.setItem('type', responseJson);
                
                // AsyncStorage.getItem('type').then(value => {
                //     console.log('this is type of user ' +value);
                // }).catch(error => {
                //     console.log(error);
                // })
                
                this.setState({ 
                    loading: false,
                    error: responseJson,
                });
                
                if(responseJson == 'Seller')
                {
                    this.props.navigation.navigate('Seller');
                }
                else if(responseJson == 'Rider')
                {
                    this.props.navigation.navigate('Rider');
                }
                else if(responseJson == 'Buyer')
                {
                    this.props.navigation.navigate('Order', { item: this.props.navigation.state.params.item })
                }
                else{
                    ToastAndroid.showWithGravity(
                        this.state.error,
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER,
                    );
                }

            })
            .catch((error) => {
                console.log(error);
                this.setState({ 
                    error: 'Server is not running!',
                    loading: false,
                });

                ToastAndroid.showWithGravity(
                    this.state.error,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            });
        }

    }

    renderContent () {
        
        return(
            <View style={{ flex: 1 }}>
    
                <View style={styles.headerStyle}>

                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                        <MaterialIcon name='menu' size={30} color='#ff0055' />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../logo.png')} style={styles.logoStyle} />
                        <Text style={styles.titleStyle}>Home-E-Food</Text>
                    </View>

                    <View>

                    </View>

                </View>

                <ScrollView>

                    <Text style={styles.screenTitleStyle}>Sign In</Text>

                    <View style={styles.container}>

                        <View style={styles.inputContainer}>

                            <Text style={styles.textInputTitle}>Email</Text>

                            <View style={styles.textBoxStyle}>
                                
                                <TextInput 
                                    style={{ width: '90%' }}
                                    onChangeText={(email) => this.setState({ email }) }
                                    placeholder='Email'
                                    onFocus={() => this.setState({ isEmail: !this.state.isEmail })}
                                    onBlur={() => this.setState({ isEmail: !this.state.isEmail })}
                                />
                                <MaterialIcon name='email' size={24} color={this.state.isEmail ? '#ff0055' : '#bbb'} />

                            </View>

                        </View>

                        <View style={styles.inputContainer}>

                            <Text style={styles.textInputTitle}>Password</Text>

                            <View style={styles.textBoxStyle}>
                                {/* <MaterialIcon name='lock-open' size={24} color='#ff0055' /> */}
                                
                                <TextInput 
                                    style={{ width: '80%' }}
                                    secureTextEntry={!this.state.showPassword}
                                    onChangeText={(password) => this.setState({ password }) }
                                    placeholder='Password'
                                    onFocus={() => this.setState({ isPassword: !this.state.isPassword })}
                                    onBlur={() => this.setState({ isPassword: !this.state.isPassword })}
                                />

                                <TouchableOpacity 
                                    onPress={() => this.setState({ showPassword: !this.state.showPassword })}
                                > 
                                    <FontAwesome name={this.state.showPassword ? 'md-eye-off' : 'md-eye' } 
                                        size={30} 
                                        color={this.state.isPassword ? '#ff0055' : '#bbb'}
                                    />
                                </TouchableOpacity>

                            </View>

                        </View>

                        <View style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                            <Text style={{ fontFamily: appFont }}>Don't have an account? </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Registration', 
                                { item: this.props.navigation.state.params.item } )}
                            >
                                <Text style={styles.uniqueText}>Sign up</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </ScrollView>

            </View>
        );
    }

    render(){
            
        return(
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <StatusBar backgroundColor="#ff0055" barStyle="light-content" />

                {this.renderContent()}

                {
                    this.state.loading ?

                    <ActivityIndicator size="large" color="#ff0055" />

                    :

                    <TouchableOpacity 
                        style={styles.buttonStyle}
                        onPress={this.handleLogin}
                    >
                        <MaterialIcon name='done' size={26} color='#fff' />
                        <Text style={{ color: '#fff', fontFamily: appFont, margin: 10, fontSize: 18 }}>
                            Login
                        </Text>
                    </TouchableOpacity>

                }

            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: screenWidth * 0.07,
    },
    logoStyle: {
        width: screenHeight * 0.06, height: screenHeight * 0.06,
    },
    screenTitleStyle: {
        alignSelf: 'center', marginVertical: 10, fontSize: 18, fontFamily: appFont
    },
    titleStyle: {
        color: '#ff0055', fontSize: 20, fontFamily: appFont, marginLeft: 10,
    },
    headerStyle: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, 
        borderColor: '#E0E0E0', paddingHorizontal: screenWidth * 0.04, paddingVertical: screenWidth * 0.03
    },
    textBoxStyle: {
        flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenWidth * 0.03,
        justifyContent: 'space-between', elevation: 2, backgroundColor: '#fff',
    },
    buttonStyle: {
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff0055', padding: 10, 
        flexDirection: 'row',
    },
    textInputTitle: {
        marginVertical: screenHeight * 0.01, fontFamily: appFont
    },
    inputContainer: {
        marginVertical: screenHeight * 0.02,
    },
    uniqueText: {
        fontFamily: appFont, color: '#ff0055', marginLeft: screenWidth * 0.01,
    }
});

export default Login;