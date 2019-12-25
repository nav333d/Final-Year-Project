import React, { Component } from 'react';
import { StyleSheet, View, Text, StatusBar, Image, TouchableOpacity, FlatList, Dimensions, ActivityIndicator,
            ToastAndroid } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import RNFetchBlob from 'rn-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker';
import firebase from 'firebase';
import 'firebase/firestore';

import { ip }  from './Variables';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const appFont = 'Poppins';

class Seller extends Component{

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
        imageLoading: false,
        currentUser: '',
        image: '',
    }

    componentDidMount(){
        
        console.log("This is Seller componentDidMount");
        fetch(ip + 'currentUser', { method: 'GET' })
        .then((response) => response.json()).then(responseJson => {
            console.log('this is current user ' +responseJson);
            this.setState({ currentUser: responseJson });
        })
        .catch((error) => {
            console.error(error);
        });

        this.fetchPosts();

    }

    fetchPosts = () => {
        this.setState({ loading: true });
        
        fetch(ip + 'sellerPosts', { method: 'GET' })
        .then((response) => response.json()).then(responseJson => {
            console.log(responseJson);
            this.setState({ data: responseJson, loading: false });
        })
        .catch((error) => {
            console.error(error);
        });
    }

    handleUpdate = (item) => {
        console.log('this is current post to update ' +item);

        this.props.navigation.navigate('AddPost', { item: item });
    }

    handleDelete (id) {
        console.log('this is current post to delete ' +id);

        fetch(ip + 'deletePost',{
                method: 'POST',
                body: JSON.stringify({
                    "id": id,
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
                    'Post deleted successfully!',
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER,
                );

                this.fetchPosts();
            })
            .catch(error => {
                console.log(error);
            })
    }

    openPicker (item) {
        this.setState({ imageLoading: true });
        const Blob = RNFetchBlob.polyfill.Blob;
        console.log(Blob);
        const fs = RNFetchBlob.fs;
        console.log(fs);
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        // console.log()
        window.Blob = Blob;
        const Fetch = RNFetchBlob.polyfill.Fetch
        
        window.fetch = new Fetch({  
            auto : true,
            binaryContentTypes : [
                'image/',
                'video/',
                'audio/',
                'foo/',
            ]
        }).build()

        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            mediaType: 'photo',
        })
        .then(image => {
            console.log('image paths is ' +image.path);
            const imagePath = image.path;
            const imageRef = firebase.storage().ref(this.state.currentUser).child(item.title);
            let mime = 'image/jpg';
            let uploadBlob = null;
            // console.log('this is image path ' +imagePath);
            
            fs.readFile(imagePath, 'base64')
                .then(data => {
                    return Blob.build(data, { type: `${mime};BASE64` })
                })
                .then(blob => {
                    uploadBlob = blob;
                    return imageRef.put(blob, { contentType: mime })
                })
                .then(() => {
                    uploadBlob.close();
                    return imageRef.getDownloadURL();
                })
                .then(url => {
                    // alert(this.state.id);
                    // alert(url);
                    // this.setState({ image: url });
                    // this.handleImage(url);

                    fetch(ip + 'uploadImage',{
                        method: 'POST',
                        body: JSON.stringify({
                            "id": item.id,
                            "image": url
                        }),
                        headers: { 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    })
                    .then(response => response.json()).then(responseJson => {
                        console.log(responseJson);
                        // this.props.navigation.navigate('Seller');
                    })
                    .catch(error => {
                        console.log(error);
                    })

                    console.log('this is url of image ' +url);
                })
                .catch(error => {
                    console.log(error);
                })
        })
        .catch(error => {
            console.log(error);
        })
    }

    returnKey(item){
        return item.id.toString();
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

                    <TouchableOpacity
                        onPress={this.fetchPosts}
                    >
                        <MaterialIcon name='refresh' size={30} color='#ff0055' />
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={styles.addButton}
                    onPress={() => this.props.navigation.navigate('AddPost')}
                >

                    <MaterialIcon name='add' size={30} color='#fff' />
                    
                </TouchableOpacity>

                {

                    this.state.loading ? 
                    
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#ff0055" />
                    </View>

                    :

                    <FlatList 
                        data={this.state.data}
                        keyExtractor={this.returnKey}
                        renderItem={({ item, index }) => (
                            <View style={styles.cardStyle}>

                                <TouchableOpacity
                                    onPress={() => this.openPicker(item)}
                                >
                                    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center',
                                                    top: screenHeight * 0.05, alignSelf: 'center' }}>
                                        
                                        {
                                            this.state.imageLoading ? 

                                            <ActivityIndicator size="large" color="#ff0055" />

                                            :

                                            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                                                <MaterialIcon 
                                                    name='insert-photo' size={100} color='#bbb' 
                                                />
                                                <Text style={{ fontFamily: appFont }}>Click here to upload image</Text>
                                            </View>
                                        }

                                        
                                    </View>
                                    <Image 
                                        source={{ uri: item.image }}
                                        style={styles.imageStyle}
                                    />

                                </TouchableOpacity>

                                <View>

                                    <Text style={styles.dishTitle}>
                                        {item.title}
                                    </Text>
                                    <Text style={{ fontFamily: appFont, }}>{item.details}</Text>
                                    <Text style={{ fontFamily: appFont, }}>
                                        Rs. {item.price}
                                    </Text>

                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                    <TouchableOpacity
                                        onPress={() => this.handleUpdate(item)}
                                        style={styles.postButton}
                                    >
                                        <MaterialIcon name='edit' size={22} color='#fff' />
                                        <Text style={styles.postButtonText}>Edit</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => this.handleDelete(item.id)}
                                        style={styles.postButton}
                                    >
                                        <MaterialIcon name='delete' size={22} color='#fff' />
                                        <Text style={styles.postButtonText}>Delete</Text>
                                    </TouchableOpacity>

                                </View>

                            </View>
                        )}
                    />

                }

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
    logoStyle: {
        width: screenHeight * 0.06, height: screenHeight * 0.06,
    },
    titleStyle: {
        color: '#ff0055', fontSize: 20, marginLeft: 10, fontFamily: appFont,
    },
    dishTitle: {
        fontSize: 18, color: '#000', fontFamily: appFont, paddingVertical: screenHeight * 0.01,
    },
    headerStyle: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: 1, 
        borderColor: '#E0E0E0', paddingHorizontal: screenWidth * 0.04, paddingVertical: screenWidth * 0.03
    },
    postButton: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#ff0055', paddingVertical: screenHeight * 0.01,
        paddingHorizontal: screenWidth * 0.02, marginRight: screenWidth * 0.02, marginTop: screenWidth * 0.02,
    },
    postButtonText: {
        color: '#fff', fontFamily: appFont,
    },
    addButton: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#ff0055', height: screenHeight * 0.09,
        width: screenHeight * 0.09, borderRadius: screenHeight * 0.045, alignSelf: 'center', elevation: 5,
        justifyContent: 'center', marginHorizontal: screenWidth * 0.03, marginVertical: screenHeight * 0.01,
    },
    imageStyle: {
        height: screenHeight * 0.3, width: '100%',
    },
    cardStyle: {
        marginVertical: screenHeight * 0.01, paddingHorizontal: screenWidth * 0.03, backgroundColor: '#fff', 
        elevation: 4, paddingVertical: screenHeight * 0.02
    }
});

export default Seller;