import React from 'react';
import { View } from 'react-native';
import { Rating, } from 'react-native-ratings';

// Alert.alert('Star Rating: ' + JSON.stringify(rating));
export default function RatingStar() {
    return (
        <View style={styles.start}>
            <Rating />
        </View>
    )
}

