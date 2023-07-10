import React from 'react';
import { Image } from 'react-native-elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../../screens/dashboard/Dashboard';
import ProductCart from '../../screens/productCart/ProductCart';



const Tab = createBottomTabNavigator();

function TabNav() {
    return (
        <Tab.Navigator  >
            <Tab.Screen name="Home" component={Dashboard}
                options={{
                    tabBarStyle: { height: 60 },
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image style={{ height: 40, width: 40 }}
                            source={require("../../assets/icons/home.png")}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="YourCart"
                component={ProductCart}
                options={{
                    tabBarStyle: { height: 60 },
                    headerShown: false,
                    tabBarIcon: () => (
                        <Image style={{ height: 40, width: 40 }}
                            source={require("../../assets/icons/cart.png")}
                        />
                    )
                }}
            />
        </Tab.Navigator>
    );
}
export default TabNav;