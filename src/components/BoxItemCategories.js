import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';


const BoxItemCategories = ({ text, color, imageuri, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.wrapperImg(color)}>
        <Image style={{ height: 60, width: 60 }} source={imageuri} />
      </View>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default BoxItemCategories;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 17,
  },
  wrapperImg: color => ({
    height: 60,
    width: 60,
    backgroundColor: color,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }),
  text: {
    marginTop: 10,
    color: 'green',
    fontSize: 14,
  },
});