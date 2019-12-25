import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TouchableOpacity, FlatList, Dimensions, TextInput, 
        KeyboardAvoidingView } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

import firebase from 'firebase';
import 'firebase/firestore';

import { ip }  from './Variables';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Reviews extends Component{

    static navigationOptions = {
        header: null,
        drawerLabel: () => null,
    }

    state = {
        loading: false,
        review: '',
    }

    handleSubmit = () => {

        fetch(ip + 'addReview',{
            method: 'POST',
            body: JSON.stringify({
                'id': this.props.navigation.state.params.item.id,
                'user_id': this.props.navigation.state.params.item.user_id,
                'index': this.props.navigation.state.params.index,
                'review': this.state.review,
            }),
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        })

    }

    renderContent () {
        
        return(

            <View>

                <View style={styles.headerStyle}>

                    <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                        <MaterialIcon name='menu' size={30} color='#ff0055' />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Image source={require('../logo.png')} style={styles.logoStyle} />
                        <Text style={styles.titleStyle}>Home-E-Food</Text>
                    </View>

                    <TouchableOpacity
                        onPress={this.fetchPosts}
                    >
                        <MaterialIcon name='refresh' size={30} color='#ff0055' />
                    </TouchableOpacity>

                </View>

                <View style={{ marginHorizontal: screenWidth * 0.02, marginVertical: screenHeight * 0.01 }}>
                    <Image source={{ uri: this.props.navigation.state.params.item.image }} style={styles.dishImage} />
                </View>

                <View style={{ marginHorizontal: screenWidth * 0.05 }}>
                    <TextInput 
                        placeholder='Your Review'
                        onChangeText={(review) => this.setState({ review })}
                    />

                    <TouchableOpacity style={{ padding: 10, backgroundColor: '#ff0055', alignItems: 'center', 
                                    justifyContent: 'center' }}
                        onPress={this.handleSubmit}
                    >
                        <Text style={{ color: '#fff', }}>Submit</Text>
                    </TouchableOpacity>
                </View>

                <FlatList 
                    data={this.props.navigation.state.params.item.reviews}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.reviewContainer}>
                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <View>
                                        <Image source={require('../avatar.png')} style={styles.userImage} />
                                    </View>
                                    <View style={{ margin: screenHeight * 0.01 }}>
                                        <Text style={styles.userText}>Naveed Khan</Text>
                                        <Text>Jun 28, 2019</Text>
                                    </View>
                                </View>

                                <View style={{ margin: screenHeight * 0.01 }}>
                                    <Text>{item}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                />

            </View>
        );

    }

    render(){
        return(
            <ScrollView>
                <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }}
                    behavior='padding'
                >
                    
                        <StatusBar 
                            backgroundColor="#ff0055" 
                            barStyle="light-content"
                        />

                        {this.renderContent()}
                    
                </KeyboardAvoidingView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    logoStyle: {
        width: screenHeight * 0.06, height: screenHeight * 0.06,
    },
    titleStyle: {
        color: '#ff0055', fontSize: 20, fontWeight: 'bold', marginLeft: 10,
    },
    headerStyle: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, 
        borderColor: '#E0E0E0', paddingHorizontal: screenWidth * 0.04, paddingVertical: screenWidth * 0.03
    },
    reviewContainer: {
        paddingVertical: screenHeight * 0.01, marginHorizontal: screenWidth * 0.05, borderBottomWidth: 1, 
        borderColor: '#e3e3e3',
    },
    userText: {
        fontSize: 16, color: '#000',
    },
    userImage: {
        height: screenHeight * 0.07, width: screenHeight * 0.07, borderRadius: 0.035,
    },
    dishImage: {
        height: screenHeight * 0.25, width: '100%',
    }
});

export default Reviews;