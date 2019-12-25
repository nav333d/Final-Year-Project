import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Loading from './Loading';


class AddPostFinal extends Component {

    static navigationOptions = {
        header: null,
        drawerLabel: () => null,
    }

    state = {
        title: '',
        details: '',
        price: '',
    }

    componentDidMount(){
        console.log('this is AddPostFinal componentDidMount');
    }

    handleSubmit = () => {

        console.log(this.state.title + " " + this.state.details + "  " +  this.state.price);

        const { title, details, price } = this.state;

        fetch('http://192.168.1.114:3000/addPost',{
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
                this.props.navigation.navigate('Seller');
            })
            .catch(error => {
                console.log(error);
            })

        fetch('http://192.168.1.114:3000/sellerPosts', { method: 'GET' })
            .then((response) => response.json()).then(responseJson => {
                console.log(responseJson);
                // this.setState({ data: responseJson, loading: false });
            })
            .catch((error) => {
                console.error(error);
            });

    }


    renderContent () {
        if(this.state.loading){
            return(
                <Loading />
                // <DotIndicator color='#FF0055' />
            );
        }

        return(

            <View style={{ flex: 1 }}>

                <View style={styles.headerStyle}>
                    <Image source={require('../logo.png')} style={styles.logoStyle} />
                    <Text style={styles.titleStyle}>Home-E-Food</Text>
                </View>

                <ScrollView elevation={4} style={styles.containerStyle}>

                    <Text style={styles.screenTitleStyle}>Add Post Details</Text>

                    <View style={{ margin: 5, }}>

                        <View style={{ alignItems: 'center' }}>

                            <Text style={{ color: 'red', fontWeight: 'bold', }}>{this.state.error}</Text>                        

                        </View>

                        <View style={{ margin: 10, }}>

                            <Text style={{ marginLeft: 10, }}>Enter Title</Text>

                            <View style={styles.textBoxStyle}>
                                <MaterialIcon name='create' size={30} color='#ff0055' />
                                <TextInput
                                    style={{ width: '90%' }}
                                    onChangeText={(title) => this.setState({ title }) }
                                />
                            </View>

                        </View>

                        <View style={{ margin: 10, }}>

                            <Text style={{ marginLeft: 10, }}>Enter Details</Text>

                            <View style={styles.textBoxStyle}>
                                <MaterialIcon name='description' size={30} color='#ff0055' />
                                <TextInput 
                                    style={{ width: '90%' }}
                                    onChangeText={(details) => this.setState({ details }) }
                                />
                            </View>

                        </View>

                        <View style={{ margin: 10, }}>

                            <Text style={{ marginLeft: 10, }}>Price</Text>

                            <View style={styles.textBoxStyle}>
                                <MaterialIcon name='monetization-on' size={26} color='#ff0055' />
                                
                                {/* <Icon3 name='md-eye-off' size={26} color='#ff0055' /> */}
                                
                                <TextInput 
                                    style={{ width: '90%' }}
                                    onChangeText={(price) => this.setState({ price }) }
                                    keyboardType='numeric'
                                />

                            </View>

                        </View>

                        <View style={{ marginHorizontal: 10, }}>
                        
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

                    </View>

                </ScrollView>

            </View>

        );

    }

    render(){
        return(
            <View style={{ flex: 1 }}>

                <StatusBar 
                    backgroundColor="#ff0055" 
                    barStyle="light-content"
                />

                {this.renderContent()}
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        margin: 10, borderRadius: 12, padding: 5,
    },
    logoStyle: {
        width: 60, height: 60,
    },
    screenTitleStyle: {
        alignSelf: 'center', fontSize: 18, fontWeight: 'bold'
    },
    titleStyle: {
        color: '#ff0055', fontSize: 20, fontWeight: 'bold', marginLeft: 10,
    },
    headerStyle: {
        flexDirection: 'row', alignItems: 'center', alignSelf: 'center',
    },
    textBoxStyle: {
        borderWidth: 1, borderColor: '#ff0055', borderRadius: 25, flexDirection: 'row', alignItems: 'center', 
        padding: 4, justifyContent: 'space-between',
    },
    buttonStyle: {
        borderWidth: 1, borderColor: '#ff0055', borderRadius: 25, alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#ff0055', padding: 10, flexDirection: 'row', marginVertical: 20
    }
});

export default AddPostFinal;