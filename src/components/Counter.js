import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


const Counter = ({ onValueChange }) => {
  const [value, setValue] = useState(1);
  useEffect(() => {
    onValueChange(value);
  }, [onValueChange, value]);

  const onCount = type => {
    let result = value;
    if (type === 'plus') {
      result = value + 1;
    }
    if (type === 'minus') {
      if (value > 1) {
        result = value - 1;
      }
    }
    setValue(result);
    onValueChange(result);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={() => onCount('minus')}>
        <Image source={require('../res/images/Icons/ic_button_min.png')} />
      </TouchableOpacity>
      <Text style={{ marginHorizontal: 10 }}>{value}</Text>
      <TouchableOpacity onPress={() => onCount('plus')}>
        <Image source={require('../res/images/Icons/ic_button_plus.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

