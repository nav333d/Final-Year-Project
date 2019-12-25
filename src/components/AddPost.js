import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, Dimensions, 
        ActivityIndicator, ToastAndroid } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Loading from './Loading';

// const ip = 'http://192.168.1.113:3000/';

import { ip }  from './Variables';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class AddPost extends Component {


    static navigationOptions = {
        header: null,
        drawerLabel: () => null,
    }

    state = {
        id: '',
        title: '',
        details: '',
        price: '',
        isTitle: false,
        isDetails: false,
        isPrice: false,
    }

    componentDidMount(){
        console.log('this is AddPost componentDidMount');

        this.props.navigation.state.params ?
        this.setState({
            id: this.props.navigation.state.params.item.id,
            title: this.props.navigation.state.params.item.title,
            details: this.props.navigation.state.params.item.details,
            price: this.props.navigation.state.params.item.price,
        })
        :
        this.setState({
            id: '',
            title: '',
            details: '',
            price: '',
        });
    }

    handleSubmit = () => {

        console.log(this.state.id + " " + this.state.title + " " + this.state.details + "  " +  this.state.price);

        const { id, title, details, price } = this.state;

        if(this.props.navigation.state.params)
        {
            fetch(ip + 'updatePost',{
                method: 'POST',
                body: JSON.stringify({
                    "id": id,
                    "title": title,
                    "details": details,
                    "price": price,
                }),
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json()).then(responseJson => {
                console.log(responseJson);
                ToastAndroid.showWithGravity(
                    'Post updated successfully!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                this.props.navigation.navigate('Seller', { fromAddPost: true });
            })
            .catch(error => {
                console.log(error);
            })
        }
        else
        {
            fetch(ip + 'addPost',{
                method: 'POST',
                body: JSON.stringify({
                    "title": title,
                    "details": details,
                    "price": price,
                }),
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            })
            .then(response => response.json()).then(responseJson => {
                console.log(responseJson);
                ToastAndroid.showWithGravity(
                    'Post added successfully!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );
                this.props.navigation.navigate('Seller');
            })
            .catch(error => {
                console.log(error);
            })
        }

    }

    renderContent () {
        if(this.state.loading){
            return(
                
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size="large" color="#ff0055" />
                </View>

            );
        }

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

                    <Text style={styles.screenTitleStyle}>Dish Details</Text>

                    <View style={styles.container}>

                        <View style={styles.inputContainer}>

                            <Text style={styles.textInputTitle}>Enter Title</Text>

                            <View style={styles.textBoxStyle}>
                                
                                <TextInput 
                                    style={{ width: '90%' }}
                                    onChangeText={(title) => this.setState({ title }) }
                                    value={this.state.title}
                                    placeholder='Title'
                                    onFocus={() => this.setState({ isTitle: !this.state.isTitle })}
                                    onBlur={() => this.setState({ isTitle: !this.state.isTitle })}
                                />
                                <MaterialIcon name='create' size={24} color={this.state.isTitle ? '#ff0055' : '#bbb'} />

                            </View>

                        </View>

                        <View style={styles.inputContainer}>

                            <Text style={styles.textInputTitle}>Enter Details</Text>

                            <View style={styles.textBoxStyle}>
                                
                                <TextInput 
                                    style={{ width: '90%' }}
                                    onChangeText={(details) => this.setState({ details }) }
                                    value={this.state.details}
                                    placeholder='Details'
                                    onFocus={() => this.setState({ isDetails: !this.state.isDetails })}
                                    onBlur={() => this.setState({ isDetails: !this.state.isDetails })}
                                />
                                <MaterialIcon name='description' size={24} color={this.state.isDetails ? '#ff0055' : '#bbb'} />

                            </View>

                        </View>

                        <View style={styles.inputContainer}>

                            <Text style={styles.textInputTitle}>Enter Price</Text>

                            <View style={styles.textBoxStyle}>
                                
                                <TextInput 
                                    style={{ width: '90%' }}
                                    onChangeText={(price) => this.setState({ price }) }
                                    keyboardType='numeric'
                                    value={this.state.price}
                                    placeholder='Price'
                                    onFocus={() => this.setState({ isPrice: !this.state.isPrice })}
                                    onBlur={() => this.setState({ isPrice: !this.state.isPrice })}
                                />
                                <MaterialIcon name='monetization-on' size={24} color={this.state.isPrice ? '#ff0055' : '#bbb'} />

                            </View>

                        </View>

                    </View>

                </ScrollView>

            </View>

        );

    }

    render(){
        return(
            <View style={{ flex: 1, backgroundColor: '#fff' }}>

                <StatusBar 
                    backgroundColor="#ff0055" 
                    barStyle="light-content"
                />

                {this.renderContent()}

                <TouchableOpacity 
                    style={styles.buttonStyle}
                    onPress={this.handleSubmit}
                >
                    <MaterialIcon name='playlist-add-check' size={30} color='#fff' />
                    
                    <Text style={{ color: '#fff', fontWeight: 'bold', margin: 10, fontSize: 18 }}>
                        Create Post Now
                    </Text>
                </TouchableOpacity>
                
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
        alignSelf: 'center', fontSize: 18, fontWeight: 'bold'
    },
    titleStyle: {
        color: '#ff0055', fontSize: 20, fontWeight: 'bold', marginLeft: 10,
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
        alignItems: 'center', justifyContent: 'center',backgroundColor: '#ff0055', 
        padding: 10, flexDirection: 'row',
    },
    inputContainer: {
        marginVertical: screenHeight * 0.02,
    },
    textInputTitle: {
        marginVertical: screenHeight * 0.01,
    },
});

export default AddPost;