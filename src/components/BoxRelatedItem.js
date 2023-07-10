import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../res';

const BoxRelatedItems = ({ image, name, price, bgColor }) => {
  console.log('namefrom box>>>>>>>>..',name)
  return (
    <View
      style={styles.container(bgColor)}>
      <View style={styles.wrapperImage}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.wrapperDetail}>
        <View style={styles.rowDetail}>
          <Text style={{ color: '#000'}}>{name}</Text>
          <Text style={styles.textPrice}>₹{price}</Text>
        </View>
      </View>
    </View>
  );
};

export default BoxRelatedItems;

const styles = StyleSheet.create({
  container: bgColor => ({
    height: 150,
    width: 130,
    backgroundColor: bgColor,
    borderRadius: 12,
    padding: 5,
    marginRight: 15,
  }),
  wrapperImage: { justifyContent: 'center', alignItems: 'center', flex: 1 },
  image: { height: 75, width: 75, resizeMode: 'contain', borderRadius: 15 },
  wrapperDetail: { justifyContent: 'flex-end' },
  rowDetail: {
    backgroundColor: colors.white,
    height: 35,
    width: '100%',
    borderRadius: 20,
    // flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  textPrice: { fontSize: 12 },
});
