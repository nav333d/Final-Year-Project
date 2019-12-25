import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Loading from './Loading';

const window_height = Dimensions.get('window').height;
const window_width = Dimensions.get('window').width;

class SellerFinal extends Component{

    static navigationOptions = {
        header: null,
        drawerLabel: () => null,
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
        // ],

        data: [],
        loading: false,
    }

    componentDidMount(){
        console.log("This is SellerFinal componentDidMount");
        this.setState({ loading: true });
        // this.timer = setInterval(()=> this.getPosts(), 3000)

        fetch('http://192.168.1.114:3000/sellerPosts', { method: 'GET' })
        .then((response) => response.json()).then(responseJson => {
            console.log(responseJson);
            this.setState({ data: responseJson, loading: false });
        })
        .catch((error) => {
            console.error(error);
        });



        // fetch('http://192.168.1.114:3000/currentUser', { method: 'GET' })
        // .then((response) => response.json()).then(responseJson => {
        //     console.log(responseJson);
        //     // this.setState({ data: responseJson });
        // })
        // .catch((error) => {
        //     console.error(error);
        // });


        // fetch('http://192.168.1.114:3000/sellerPosts', { method: 'GET' })
        // .then((response) => response.json()).then(responseJson => {
        //     console.log(responseJson);
        //     // this.setState({ data: responseJson });
        // })
        // .catch((error) => {
        //     console.error(error);
        // });

    }

    handleDelete(){

    }

    returnKey(item){
        return item.id.toString();
    }

    renderContent () {
        if(this.state.loading){
            return(
                <Loading />
            );
        }

        return(
            <View style={{ flex: 1 }}>
                
                <View style={styles.headerStyle}>
                    <Image source={require('../logo.png')} style={styles.logoStyle} />
                    <Text style={styles.titleStyle}>Home-E-Food</Text>
                </View>

                {/* <Text style={styles.screenTitleStyle}>Posts</Text> */}

                <TouchableOpacity style={styles.addButton}
                    onPress={() => this.props.navigation.navigate('AddPostFinal')}
                >

                    <MaterialIcon name='add-circle' size={30} color='#fff' />
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20 }}>Add Post</Text>
                    
                </TouchableOpacity>

                <FlatList 
                    data={this.state.data}
                    keyExtractor={this.returnKey}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: '#ff0055', 
                                        borderWidth: 1, borderRadius: 25, padding: 5, margin: 6, }}                
                        >

                            <View style={{ width: '70%', }}>

                                <Image 
                                    source={{ uri: item.image }}
                                    style={{ height: 200, width: 200, borderRadius: 100, }}
                                />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', }}>{item.title}</Text>
                                <Text style={{ fontStyle: 'italic' }}>{item.details}</Text>
                                <Text style={{ color: 'red', fontSize: 18, fontWeight: 'bold' }}>
                                    Only Rs. {item.price}
                                </Text>

                            </View>

                            <View>
                                
                                <TouchableOpacity style={styles.postButton}>
                                    <MaterialIcon name='edit' size={26} color='#fff' />
                                    <Text style={styles.postButtonText}>Edit</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.postButton}
                                    onPress={this.handleDelete}
                                >
                                    <MaterialIcon name='delete' size={26} color='#fff' />
                                    <Text style={styles.postButtonText}>Delete</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    )}
                />

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
        alignSelf: 'center', marginVertical: 10, fontSize: 18, fontWeight: 'bold'
    },
    titleStyle: {
        color: '#ff0055', fontSize: 20, fontWeight: 'bold', marginLeft: 10,
    },
    headerStyle: {
        flexDirection: 'row', alignItems: 'center', alignSelf: 'center',
    },
    postButton: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#ff0055', height: window_height * 0.12, 
        width: window_height * 0.12, borderRadius: 50, justifyContent: 'center', margin: 10, elevation: 5
    },
    postButtonText: {
        color: '#fff', fontWeight: 'bold',
    },
    addButton: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#ff0055', height: window_height * 0.1,
        borderRadius: 50, justifyContent: 'center', margin: 10, elevation: 5
    }
});

export default SellerFinal;