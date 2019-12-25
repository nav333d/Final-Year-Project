import React from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } 
          from "react-navigation";

import Login from '../components/Login';
import Registration from '../components/Registration';
import Seller from '../components/Seller';
import Rider from '../components/Rider';
import Main from '../components/Main';
import AddPost from '../components/AddPost';
import Blank from '../components/Blank';
import Reviews from '../components/Reviews';
import Order from '../components/Order';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const CustomDrawerContentComponent = (props) => {
  return(
      <View>
          <View style={styles.headerStyle}>
              <View style={{ borderColor: '#fff', borderWidth: 2, borderRadius: 500,
                          height: 135, width: 140, alignItems: 'center', justifyContent: 'center' }}>
                  <Image 
                      style={styles.drawerImage}
                      source={require('../logo.png')}
                  />
                  <Text style={styles.textStyle}>Home-E-Food</Text>
              </View>
          </View>

          <View>
              <DrawerItems {...props} />
          </View>
      </View>
  );
};

const styles = StyleSheet.create({
  drawerImage: {
      height: 60, width: 60, tintColor: '#fff',
  },
  headerStyle: {
      height: 140, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FF0055',
  },
  textStyle: {
      color: '#fff', fontSize: 22, fontFamily: 'cursive', fontWeight: 'bold',
  }
});

const AppNavigator = createDrawerNavigator({
    Login: {
      screen: Login,
    },
    Registration: {
        screen: Registration,
    },
    Rider: {
      screen: Rider,
    },
    Seller: {
      screen: Seller,
    },
    Main: {
      screen: Main,
    },
    Blank: {
      screen: Blank,
    },
    AddPost: {
      screen: AddPost,
    },
    Reviews: {
      screen: Reviews,
    },
    Order: {
      screen: Order,
    }
  },
  {
    initialRouteName: 'Main',
    contentOptions: {
      inactiveTintColor: '#EB4C81',
      activeTintColor: '#FF0055',
    },
    contentComponent: CustomDrawerContentComponent,
    drawerWidth: screenWidth * 0.9,
  }

);
  
export default createAppContainer(AppNavigator);