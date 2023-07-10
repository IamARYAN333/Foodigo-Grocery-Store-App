import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Gap from './Gap';
import { fonts, IC_Love } from '../res';

const BoxItemTrendingProduct = ({ bgColor, icon, text, price, onPress }) => {
  const [fav, setFav] = useState(false);
  return (
    <TouchableOpacity style={styles.container(bgColor)} onPress={onPress}>
      <View style={{ top: -40 }}>
        <View>
          <Image source={icon} style={styles.image} />
          <Gap height={20} />
          <Text style={styles.text}>{text}</Text>
        </View>
        <Gap height={20} />
        <View style={styles.price}>
          <Text style={styles.wrapperButtom}>₹{price}</Text>
          {!fav ? <TouchableOpacity
            onPress={() => {
              setFav(true)
            }}
          >
            <Image source={require('../res/images/Icons/ic_love.png')} />
          </TouchableOpacity> : <TouchableOpacity
            onPress={() => {
              setFav(false)
            }}
          >
            <Image style={styles.favIcon} source={{ uri: 'https://img.icons8.com/fluency/344/like.png' }} />
          </TouchableOpacity>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BoxItemTrendingProduct;

const styles = StyleSheet.create({
  container: bgColor => ({
    height: 160,
    width: 150,
    backgroundColor: bgColor,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 40,
  }),
  text: {
    paddingLeft: 10,
    fontSize: 16,
    fontFamily: fonts.Medium,
  },
  favIcon: {
    height: 20,
    width: 20
  },
  price: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  wrapperButtom: {
    fontSize: 18,
    fontFamily: fonts.Medium,
  },
  image: {
    height: 110,
    width: 110,
    resizeMode: 'contain',
    marginLeft: 20,
  },
});