import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image, Dimensions } from 'react-native';

import { DotIndicator } from 'react-native-indicators';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

class Loading extends Component {

    // componentDidMount(){
    //     if(this.props.navigation.state.params.addPost != null)
    //     {
    //         console.log('From Add Post!');
    //         this.props.navigation.navigate('Seller');
    //     }
        
    // }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <Image source={require('../logo.png')} style={styles.logoStyle} />
                    <Text style={styles.text}>Home-E-Food</Text>
                </View>
                {/* <ActivityIndicator color="#FF0055" size="large" /> */}
                <DotIndicator color='#FF0055' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white',
    },
    text: {
        textAlign: 'center', fontSize: 20, fontWeight: 'bold', color: '#FF0055', marginLeft: 5,
    },
    logoStyle: {
        width: screenHeight * 0.06, height: screenHeight * 0.06,
    },
})

export default Loading;