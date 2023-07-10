import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, StackActions } from '@react-navigation/native';

//
import Logo from '../../assets/images/logo.jpeg';
import Logo1 from '../../assets/images/logo1.png';

export default function SplashScreen() {
    //
    const navigation = useNavigation();

    useEffect(() => {
        setTimeout(async () => {
            navigation.dispatch(StackActions.replace('loginScreen'));
        }, 4000);
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />

            <View style={styles.logoContainer}>
                <Image source={Logo1} style={styles.logo} />
            </View>

            {/* <View style={styles.bottomContainer}>
                <Text style={styles.bottomText}>Made With 💗 From India</Text>
            </View> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    logoContainer: {
        // alignItems: 'center',
    },
    logo: {
        height: 200,
        width: 200,
        borderRadius:25
    },
    text: {
        color: '#fff',
    },
    bottomContainer: {},
    bottomText: {
        color: '#fff',
    },
});