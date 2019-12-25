import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';

import { DotIndicator } from 'react-native-indicators';

class Blank extends Component {
    
    static navigationOptions = {
        header: null,
        drawerLabel: () => null,
    }

    componentDidMount(){
        this.props.navigation.navigate('Seller');
        // if(this.props.navigation.state.params.addPost == true)
        // {
        //     console.log('From Add Post!');
        //     this.props.navigation.navigate('Seller');
        // }
        

        // this.timer = setInterval(() => this.getPosts(), 3000)
    }

    // async getPosts(){
    //     this.props.navigation.navigate('Seller');
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text: {
        textAlign: 'center', 
        fontSize: 20, 
        fontWeight: 'bold',
        color: '#FF0055',
        marginLeft: 5,
    },
    logoStyle: {
        width: 60, height: 60,
    },
})

export default Blank;