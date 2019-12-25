import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, Dimensions, 
        ToastAndroid, ActivityIndicator, AsyncStorage } from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ip }  from './Variables';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const appFont = 'Poppins';

class Registration extends Component {

    static navigationOptions = {
        header: null,
        drawerIcon: () => (<MaterialIcon name='person-add' size={26} color='#ff0055' />),
    }

    state = {
        firstName: '',
        isFirstName: false,
        lastName: '',
        isLastName: false,
        email: '',
        isEmail: false,
        password: '',
        isPassword: false,
        type: '',
        confirmPassword: '',
        isConfirmPassword: false,
        error: '',
        loading: false,
        showPassword: false,
        showConfirmPassword: false,
        accountTypes: [
            {
                value: 'Seller',
            }, 
            {
                value: 'Rider',
            }, 
            {
                value: 'Buyer',
            }
        ]
    }

    handleSubmit = () => {

        this.setState({ 
            loading: true,
            // error: '', 
        });

        const { firstName, lastName, email, password, confirmPassword, type } = this.state;
        // console.log(name + email + password + confirmPassword);

        if(firstName == '' || lastName == '' || email == '' || password == '' || confirmPassword == '' || type == ''){
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
        else if(password !== confirmPassword){
            this.setState({ 
                error: 'Please Re-Enter Password Correctly',
                loading: false,
            });

            ToastAndroid.showWithGravity(
                this.state.error,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
            );
        }
        else{

            fetch(ip + 'registration',{
                method: 'POST',
                body: JSON.stringify({
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email.toLowerCase(),
                    "password": password,
                    "type": type,
                }),
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then((response) => response.json()).then(responseJson => {

                AsyncStorage.setItem('userCredentials', { email: email.toLowerCase(), password: password })

                AsyncStorage.getItem('userCredentials').then(value => {
                    console.log('this is userCredentials ' +value);
                }).catch(error => {
                    console.log(error);
                })

                console.log(responseJson);

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
                else
                {
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
                    loading: false,
                    error: 'Server is not running!'
                });

                ToastAndroid.showWithGravity(
                    this.state.error,
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
            });

        }

    }

    handleDropDown = (value) => {
        console.log(value);
        this.setState({ type: value });
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

                    <Text style={styles.screenTitleStyle}>Registration</Text>

                    <View style={styles.container}>

                        <View style={styles.inputContainer}>

                            <Text style={styles.textInputTitle}>First Name</Text>

                            <View style={styles.textBoxStyle}>
                                
                                <TextInput 
                                    style={{ width: '90%' }}
                                    onChangeText={(firstName) => this.setState({ firstName }) }
                                    placeholder='First Name'
                                    onFocus={() => this.setState({ isFirstName: !this.state.isFirstName })}
                                    onBlur={() => this.setState({ isFirstName: !this.state.isFirstName })}
                                />
                                <MaterialIcon name='person' size={24} color={this.state.isFirstName ? '#ff0055' : '#bbb'} />

                            </View>

                        </View>

                        <View style={styles.inputContainer}>

                            <Text style={styles.textInputTitle}>Last Name</Text>
                            
                            <View style={styles.textBoxStyle}>
                                
                                <TextInput 
                                    style={{ width: '90%' }}
                                    onChangeText={(lastName) => this.setState({ lastName }) }
                                    placeholder='Last Name'
                                    onFocus={() => this.setState({ isLastName: !this.state.isLastName })}
                                    onBlur={() => this.setState({ isLastName: !this.state.isLastName })}
                                />
                                <MaterialIcon name='person' size={24} color={this.state.isLastName ? '#ff0055' : '#bbb'} />

                            </View>

                        </View>

                        <View style={styles.inputContainer}>

                            <Text style={{ fontSize: 14, color: '#9c9c9c', alignSelf: 'flex-end' }}>
                                <Text style={{ color: 'red' }}>*</Text>
                                email should be in lower case
                            </Text>
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

                            <Text style={{ fontSize: 14, color: '#9c9c9c', alignSelf: 'flex-end' }}>
                                <Text style={{ color: 'red' }}>*</Text>
                                    password should be atleast six characters
                            </Text>
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

                        <View style={styles.inputContainer}>

                            <Text style={styles.textInputTitle}>Confirm Password</Text>
                            
                            <View style={styles.textBoxStyle}>

                                <TextInput 
                                    style={{ width: '80%' }}
                                    secureTextEntry={!this.state.showConfirmPassword}
                                    onChangeText={(confirmPassword) => this.setState({ confirmPassword }) }
                                    placeholder='Confirm Password'
                                    onFocus={() => this.setState({ isConfirmPassword: !this.state.isConfirmPassword })}
                                    onBlur={() => this.setState({ isConfirmPassword: !this.state.isConfirmPassword })}
                                />

                                <TouchableOpacity 
                                    onPress={() => this.setState({ showConfirmPassword: !this.state.showConfirmPassword })}
                                >
                                    <FontAwesome name={this.state.showConfirmPassword ? 'md-eye-off' : 'md-eye' } 
                                        size={30} 
                                        color={this.state.isConfirmPassword ? '#ff0055' : '#bbb'}
                                    />
                                </TouchableOpacity>
                            </View>

                        </View>

                        <View style={styles.inputContainer}>

                            <Dropdown
                                label='Account Type'
                                data={this.state.accountTypes}
                                onChangeText={this.handleDropDown}
                                dropdownOffset={{ top: 12, left: 0 }}
                            />

                        </View>

                        <View style={[styles.inputContainer, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                            <Text style={{ fontFamily: appFont }}>Have an account? </Text>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('Login')}
                            >
                                <Text style={styles.uniqueText}>Log in</Text>
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
                        onPress={this.handleSubmit}
                    >
                        <Icon name='account-card-details' size={24} color='#fff' />
                    
                        <Text style={{ color: '#fff', fontWeight: 'bold', margin: 10, fontSize: 18 }}>
                            Register Now
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
        alignSelf: 'center', fontSize: 18, fontFamily: appFont
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
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#ff0055', 
        padding: 10, flexDirection: 'row',
    },
    textInputTitle: {
        marginVertical: screenHeight * 0.01,
    },
    inputContainer: {
        marginVertical: screenHeight * 0.02,
    },
    errorContainer: {
        alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', height: screenHeight * 0.04,
        width: screenWidth * 0.4, borderBottomWidth: 3, borderColor: 'red',
    },
    errorText: {
        color: '#fff',
    },
    textInputContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    },
    uniqueText: {
        fontFamily: appFont, color: '#ff0055', marginLeft: screenWidth * 0.01,
    }
});

export default Registration;