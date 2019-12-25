import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TouchableOpacity, FlatList, Dimensions, TextInput, 
        ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';


import firebase from 'firebase';
import 'firebase/firestore';

import { ip }  from './Variables';

var Sentiment = require('sentiment');

var sentiment = new Sentiment();

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const appFont = 'Poppins';

class Main extends Component{

    static navigationOptions = {
        header: null,
        drawerLabel: () => 'Home',
        drawerIcon: () => (<MaterialIcon name='home' size={26} color='#ff0055' />),
    }

    state = {
        // data: [
        //     {
        //         image: 'http://www.pakistanichefrecipes.com/wp-content/uploads/2017/10/chicken-manchurian.jpg',
        //         title: 'Chicken Manchurian',
        //         details: 'Yummy and Delicious Chicken Manchurian at affordable price.',
        //         price: 150,

        //     },
        //     {
        //         image: 'https://sifu.unileversolutions.com/image/en-AU/recipe-topvisual/2/1260-709/beef-burger-with-deep-fried-bacon-and-thousand-island-dressing-50247463.jpg',
        //         title: 'Beef Burger',
        //         details: 'Yummy and Delicious Beef Burger at affordable price.',
        //         price: 250,
        //     },
        //     {
        //         image: 'https://funkyfriesandburgers.com/wp-content/uploads/2016/08/buffalo-chicken-fries-1024x683-1024x683.jpg',
        //         title: 'Chicken Cheese Fries',
        //         details: 'Yummy and Delicious Chicken Cheese Fries at affordable price.',
        //         price: 100,
        //     },
        // ]
        data: [],
        loading: false,
        reviews: ['this is really great dish', 'i have never eat such a yummy and juicy biryani', 
                    'yummy and delicious dish', 'very bad experience , too much unhealthy dish', 
                    'i recommend not to eat this bad dish , poor quality, bad , bad, bad, bad'],
        emoji: '',
        text: '',
    }

    returnKey(item){
        return item.id.toString();
    }

    componentDidMount(){

        // this.setState({ loading: true });
        // this.timer = setInterval(()=> this.getPosts(), 3000)

        this.fetchPosts();

    }

    fetchPosts = () => {

        this.setState({ loading: true });
        fetch(ip + 'posts', { method: 'GET' })
        .then((response) => response.json()).then(responseJson => {
            // console.log(responseJson);
            this.setState({ data: responseJson, loading: false });
        })
        .catch((error) => {
            console.error(error);
        });

    }

    // async getPosts(){
    //     fetch(ip + 'posts', { method: 'GET' })
    //     .then((response) => response.json()).then(responseJson => {
    //         // console.log(responseJson);
    //         this.setState({ data: responseJson, loading: false });
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });
    // }

    // async getPosts(){
    //     fetch(ip + 'posts', { method: 'GET' })
    //     .then((response) => response.json()).then(responseJson => {
    //         // console.log(responseJson);
    //         this.setState({ data: responseJson, loading: false });
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     });

    //     console.log(this.state.data.length);
    // }

    setEmoji(reviews){

        console.log('this is setemoji');

        var totalPositiveReviews = 0;
        var totalNegativeReviews = 0;

        reviews.forEach(review => {

            console.log(review);
            var response = sentiment.analyze(review);
            if(response.score > 0)
            {
                totalPositiveReviews ++;
            }
            else if(response.score < 0)
            {
                totalNegativeReviews ++;
            }

            console.log("RESULT", response);

        });
        var result = ( ( totalPositiveReviews / (totalPositiveReviews + totalNegativeReviews) ) * 100) /20;
        var roundedResult = Math.round(result * 10) / 10;
        console.log(result);

        if(roundedResult > 2.5)
        {
            var object = {
                emoji: 'emoji-happy',
                color: 'green',
                rating: roundedResult,
            };
            return object;
        }
        else if(roundedResult == 2.5)
        {
            var object = {
                emoji: 'emoji-neutral',
                color: 'black',
                rating: roundedResult,
            };
            return object;
        }
        else if(roundedResult < 2.5)
        {
            var object = {
                emoji: 'emoji-sad',
                color: 'red',
                rating: roundedResult,
            };
            return object;
        }
        else
        {
            var object = {
                emoji: 'emoji-neutral',
                color: 'gray',
                rating: 0,
            };
            return object;
        }

    }

    renderContent () {

        const filteredPosts = this.state.data.filter(post => {

            return post.title.toLowerCase().includes(this.state.text.toLowerCase());
            
        })
      
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

                    <TouchableOpacity
                        onPress={this.fetchPosts}
                    >
                        <MaterialIcon name='refresh' size={30} color='#ff0055' />
                    </TouchableOpacity>

                </View>

                <View style={styles.searchBar}>

                        <MaterialIcon name='search' size={30} color='#ff0055' />

                        <TextInput
                            style={{ width: '90%' }}
                            placeholder='Dish name e.g: Biryani'
                            onChangeText={(text) => {this.setState({ text })}}
                            value={this.state.text}
                        />
                </View>

                {
                    this.state.loading ? 
                    
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#ff0055" />
                    </View>

                    :

                    <FlatList 
                        data={filteredPosts}
                        keyExtractor={this.returnKey}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity style={styles.postContainer}
                                onPress={() => this.props.navigation.navigate('Login', { item })}
                            >

                                <View>

                                    <Image 
                                        source={{ uri: item.image }}
                                        style={styles.imageStyle}
                                    />

                                </View>

                                <View style={styles.ratingsContainer}>
                                    <Text style={styles.dishTitle}>
                                        {item.title}
                                    </Text>

                                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                                        onPress={() => this.props.navigation.navigate('Reviews', { item, index })}
                                    >

                                        <Entypo 
                                            style={{ marginHorizontal: 4 }} 
                                            name={
                                                this.setEmoji(item.reviews).emoji
                                            } 
                                            
                                            size={16} color={this.setEmoji(item.reviews).color}
                                        />

                                        <Text>{this.setEmoji(item.reviews).rating}</Text>

                                        <MaterialIcon name='star' size={16} color={this.setEmoji(item.reviews).color} />
                                        
                                    </TouchableOpacity>
                                </View>

                                <Text style={{ fontFamily: appFont }}>{item.details}</Text>
                                <Text style={{ fontFamily: appFont }}>
                                    Rs. {item.price}
                                </Text>
                                
                            </TouchableOpacity>
                        )}
                    />

                }

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
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logoStyle: {
        width: screenHeight * 0.06, height: screenHeight * 0.06,
    },
    imageStyle: {
        height: screenHeight * 0.3, width: '100%',
    },
    screenTitleStyle: {
        alignSelf: 'center', marginVertical: 10, fontSize: 18, fontFamily: appFont
    },
    titleStyle: {
        color: '#ff0055', fontSize: 20, marginLeft: 10, fontFamily: appFont
    },
    dishTitle: {
        fontSize: 18, color: '#000', marginVertical: screenHeight * 0.01, fontFamily: appFont, 
        borderBottomWidth: 2, borderColor: '#ff0055',
    },
    headerStyle: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, 
        borderColor: '#E0E0E0', paddingHorizontal: screenWidth * 0.04, paddingVertical: screenWidth * 0.03
    },
    buttonStyle: {
        borderWidth: 1, borderColor: '#ff0055', borderRadius: 25, alignItems: 'center', justifyContent: 'center',
        backgroundColor: '#ff0055', padding: 10, flexDirection: 'row',
    },
    ratingsContainer: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
    },
    searchBar: {
        height: screenHeight * 0.09, elevation: 4, backgroundColor : "#fff", flexDirection: 'row', 
        alignItems: 'center', marginHorizontal: screenWidth * 0.04, paddingHorizontal: screenWidth * 0.05,
        marginVertical: screenHeight * 0.01,
    },
    postContainer: {
        marginVertical: screenHeight * 0.01, paddingHorizontal: screenWidth * 0.04, backgroundColor: '#fff', 
        elevation: 4, paddingVertical: screenHeight * 0.02,
    }
});

export default Main;