import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LogIn from "../../screens/login/LogIn";
import SignUp from "../../screens/signUp/SignUp";
import Dashboard from "../../screens/dashboard/Dashboard";
import DrawerNav from "../DrawerNav/DrawerNav";
import UserDetails from "../../screens/userDetails/UserDetail";
import Home from "../../screens/home/Home";


import Categories from "../../screens/categoriesScreen/CategoriesScreen";
import Detail from "../../screens/detail/Detail";
import SplashScreen from "../../screens/splash/Splash";
import ProductCart from "../../screens/productCart/ProductCart";
import SelectAddress from '../../screens/address/SelectAddress';
import OrderConfirmation from "../../screens/orders/OrdersConfirmation";


const Stack = createStackNavigator();
const StackNav = () => {


    return (

        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='splashScreen'
        >
            <Stack.Screen
                name="loginScreen"
                component={LogIn}
            />

            <Stack.Screen
                 screenOptions={{
                headerShown: true
                }}
                name="signupScreen"
                component={SignUp}
            />

            <Stack.Screen
                name='dashboard'
                component={Dashboard}
            />
            <Stack.Screen
                name="Home"
                component={Home}
            />

            <Stack.Screen
                name="drawer"
                component={DrawerNav}
            />

            <Stack.Screen
                name="userdetailsScreen"
                component={UserDetails}
            />
            <Stack.Screen
                name="Categories"
                component={Categories}
            />
            <Stack.Screen
                name="Detail"
                component={Detail}
            />

            <Stack.Screen
                name="splashScreen"
                component={SplashScreen}
            />

            <Stack.Screen
                name="YourCart"
                component={ProductCart} />
            
            <Stack.Screen 
                name="SelectAddress"
                component={SelectAddress} />

            <Stack.Screen 
                name="OrderConfirmation"
                component={OrderConfirmation} />

        </Stack.Navigator>

    )
}
export default StackNav;