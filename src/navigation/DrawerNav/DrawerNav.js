import React, { useEffect, useState } from "react";
import { Alert, Image, StyleSheet, ActivityIndicator } from "react-native";
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import UserDetails from "../../screens/userDetails/UserDetail";
import Home from "../../screens/home/Home";
import MyOrders from '../../screens/orders/MyOrders'
import { useNavigation } from "@react-navigation/native";
// import { db } from "../../firebase/firebaseConfig/firebase-config";
import AboutApp from "../../screens/aboutApp/AboutApp";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import database from '@react-native-firebase/database';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
    const [currentUserInfo, setcurrentUserInfo] = useState([]);
    const [loadScreen, setLoadScreen] = useState(true);
    const navigation = useNavigation();
    let isLoggedInThroughGoogle = false;

    const navToLoginPage = () => {
        navigation.navigate('loginScreen');
    }

    const getUserData = () => {
        database()
        .ref('/CurrentUser/')
        .once('value', function (snapshort) {
          console.log('Snapshort from user details..........',snapshort)
               let data = [];
               snapshort.forEach(item => {
              data.push(item);
            });
            setcurrentUserInfo(JSON.parse(JSON.stringify(data)));
                 setLoadScreen(false)
        });
        for (let i = 0; i < currentUserInfo.length; i++) {
            if (currentUserInfo[i].isSignInWithGoole) {
                isLoggedInThroughGoogle = true;
            }
        }
    }

    useEffect(() => {
        getUserData();
    }, [])


    const signOutGoogle = async () => {
       
        let currentUserInfoID = currentUserInfo[0].id
        console.log('inside the logout',currentUserInfoID)
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        } catch (error) {
            console.error(error);
        }
        await database().ref(`/CurrentUser/${currentUserInfoID}`).remove()
        navToLoginPage();
    };


    const logOut = async () => {
        let currentUserInfoID = currentUserInfo[0].id
        console.log('inside the logout',currentUserInfoID)
        await database().ref(`/CurrentUser/${currentUserInfoID}`).remove()
        navToLoginPage();
    }


    return (
        <Drawer.Navigator initialRouteName="Foodigo"
            drawerContent={props => {
                return (
                    <DrawerContentScrollView>
                        <DrawerItemList{...props} />
                        <DrawerItem label="Logout" onPress={() => signOutGoogle() } />
                    </DrawerContentScrollView>
                )
            }}

            screenOptions={{
                drawerLabelStyle: { marginLeft: -10, fontSize: 18 },
                // drawerActiveBackgroundColor: "#FA0309",
                // drawerInactiveBackgroundColor: "#33333",
                // drawerActiveTintColor: "#fff",
                // drawerInactiveTintColor: "#33333",
            }}
        >
      
            <Drawer.Screen
                name={currentUserInfo && currentUserInfo[0]?.name ?  `Welcome, ${currentUserInfo[0]?.name}` : 'Welcome, User'}
                component={UserDetails}
                options={{
                    drawerIcon: () =>
                       loadScreen ? <ActivityIndicator size="large" color="0000ff" /> : !currentUserInfo[0].image ?
                            <Image style={styles.imgProfile} source={{ uri: 'https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png' }} /> : <Image style={styles.imgProfile} source={{ uri: currentUserInfo[0].image }} />

                }}
            />
         
         <Drawer.Screen
                name="Foodigo"
                component={Home}
                options={{
                    drawerIcon: () => (
                        <Image style={styles.imgIcon} source={{ uri: 'https://img.icons8.com/glyph-neue/344/home.png' }}
                        />
                    )
                }}
            />

            <Drawer.Screen
                name="My Orders"
                component={MyOrders}
                options={{
                    drawerIcon: () => (
                        <Image style={styles.imgIcon} source={require('../../res/images/Icons/choices.png')}
                        />
                    )
                }}
            />


            <Drawer.Screen
                name="About App"
                component={AboutApp}
                options={{
                    drawerIcon: () => (
                        <Image style={styles.imgIcon} source={{ uri: 'https://img.icons8.com/dotty/344/about.png' }}
                        />
                    )
                }}
            />
        </Drawer.Navigator>
    )
}

const styles = StyleSheet.create({
    imgIcon: {
        height: 20,
        width: 20
    },
    imgProfile: {
        height: 50,
        width: 50,
        borderRadius: 15
    }
})

export default DrawerNav;
