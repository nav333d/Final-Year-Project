import React, { Component } from 'react';
import { View, Text, StatusBar, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

import firebase from 'firebase';
import 'firebase/firestore';

import { ip }  from './Variables';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const appFont = 'Poppins';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class Order extends Component {

    static navigationOptions = {
        header: null,
        drawerLabel: () => null,
    }

    state = {
        count: 1,
        currentUser: '',
    }

    componentDidMount(){
        // console.log(firebase.auth().currentUser.email);

        console.log("This is Order componentDidMount");
        fetch(ip + 'currentUser', { method: 'GET' })
        .then((response) => response.json()).then(responseJson => {
            console.log('this is current user ' +responseJson);
            this.setState({ currentUser: responseJson });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    handleIncrement = () => {
        this.setState({ count: ++this.state.count });
    }

    handleDecrement = () => {
        if(this.state.count == 1)
        {
            this.setState({ count: 1 });
        }
        else
        {
            this.setState({ count: --this.state.count });
        }
        
    }

    handlePress = () => {

        fetch(ip + 'sendEmail',{
            method: 'POST',
            body: JSON.stringify({
                "to": this.state.currentUser,
                "total": (this.state.count * this.props.navigation.state.params.item.price),
                "title": this.props.navigation.state.params.item.item
            }),
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
        .then((response) => response.json()).then(responseJson => {
            console.log(responseJson);

        })
        .catch((error) => {
            console.log(error);
            
        });

    }

    render(){

        const item = this.props.navigation.state.params.item;

        return(
            <View style={{ margin: screenHeight * 0.01 }}>
                <StatusBar 
                    backgroundColor="#ff0055" 
                    barStyle="light-content"
                />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
                                padding: screenHeight * 0.02, borderWidth: 1, borderColor: '#f3f3f3', 
                                backgroundColor: '#fff'}}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        
                        <TouchableOpacity
                            onPress={this.handleDecrement}
                        >
                            <MaterialIcon name='remove' size={28} color='#ff0055' />
                        </TouchableOpacity>
                        <Text style={{ fontFamily: appFont, fontSize: screenHeight * 0.02, 
                            margin: screenHeight * 0.01 }}
                        >
                            {this.state.count}
                        </Text>
                        <TouchableOpacity
                            onPress={this.handleIncrement}
                        >
                            <MaterialIcon name='add' size={28} color='#ff0055' />
                        </TouchableOpacity>
                        
                        <View style={{ marginLeft: screenWidth * 0.02 }}>
                            <Text style={{ fontFamily: appFont, fontSize: screenHeight * 0.02 }}>{item.title}</Text>
                        </View>

                    </View>

                    <View>
                        <Text style={{ fontFamily: appFont }}>Rs. {item.price * this.state.count}</Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
                                padding: screenHeight * 0.02, paddingVertical: screenHeight * 0.03, 
                                borderWidth: 1, borderColor: '#f3f3f3', 
                                backgroundColor: '#fff', borderTopColor: 'transparent' }}>
                    <Text style={{ fontFamily: appFont }}>Subtotal</Text>
                    <Text style={{ fontFamily: appFont }}>Rs. {item.price * this.state.count}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
                                padding: screenHeight * 0.02, paddingVertical: screenHeight * 0.03, 
                                borderWidth: 1, borderColor: '#f3f3f3', 
                                backgroundColor: '#fff', borderTopColor: 'transparent' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: appFont, color: '#000', fontWeight: 'bold' }}>Total</Text>
                        <Text>(incl. GST)</Text>
                    </View>
                    <Text style={{ fontFamily: appFont, color: '#000', fontWeight: 'bold' }}>Rs. {item.price * this.state.count}</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', 
                                padding: screenHeight * 0.02, paddingVertical: screenHeight * 0.03, 
                                borderWidth: 1, borderColor: '#f3f3f3', 
                                backgroundColor: '#fff', borderTopColor: 'transparent', marginTop: screenHeight * 0.05 }}>
                    <Text style={{ fontFamily: appFont, fontSize: screenHeight * 0.02 }}>Contact Info</Text>
                    <Text style={{ fontFamily: appFont }}>{this.state.currentUser}</Text>
                </View>

                <View style={{  padding: screenHeight * 0.02, paddingVertical: screenHeight * 0.03, 
                                borderWidth: 1, borderColor: '#f3f3f3', 
                                backgroundColor: '#fff', borderTopColor: 'transparent' }}>
                    <Text style={{ fontFamily: appFont, fontSize: screenHeight * 0.02 }}>Delivery Details</Text>
                    <Text style={{ fontFamily: appFont }}>My Address</Text>
                </View>

                <TouchableOpacity style={{ backgroundColor: '#ff0055', padding: screenHeight * 0.02, 
                                        paddingVertical: screenHeight * 0.03, justifyContent: 'space-between', 
                                        flexDirection: 'row', alignItems: 'center' }}
                    onPress={this.handlePress}                        
                >

                    <View style={{ backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center',
                            height: screenHeight * 0.03, width: screenHeight * 0.03,
                            borderRadius: screenHeight * 0.015 }}>
                        <Text style={{ color: '#ff0055', fontFamily: appFont, }}>{this.state.count}</Text>
                        
                    </View>

                    <Text style={{ fontFamily: appFont, color: '#fff', textTransform: 'uppercase', }}>
                        place order
                    </Text>

                    <Text style={{ fontFamily: appFont, color: '#fff', }}>
                        Rs. {item.price * this.state.count}
                    </Text>
                            
                </TouchableOpacity>

                <View style={{ paddingVertical: screenHeight * 0.03, paddingHorizontal: screenWidth * 0.02 }}>
                    <Text style={{ fontFamily: appFont, marginVertical: screenHeight * 0.02 }}>
                        By completing this order, I agree to all Terms & Conditions
                    </Text>

                    <Text style={{ fontFamily: appFont, fontSize: screenHeight * 0.02, marginVertical: screenHeight * 0.02 }}>
                        I agree and I demand that you execute the ordered service before the end of the revocation period.I am aware that after complete fulfillment of the service I lose my right of rescission.
                    </Text>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});

export default Order;