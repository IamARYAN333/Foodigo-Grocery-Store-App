import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  Button,
} from 'react-native';

const { width } = Dimensions.get('window');
const height = width * 0.6;

const images = [
  'https://i.imgur.com/qng7XJV.png',
  'https://www.grocistore.com/admin/uploads/banners/web_banners/banner1576516931.JPG',
  'https://basketpay.in/wp-content/uploads/2019/01/inestpay-fresh-produces-website-banner-940x400.png',
  'https://i.pinimg.com/736x/b6/80/a6/b680a65ee456ba9299a356a2a0605392.jpg',
  'https://img.freepik.com/premium-psd/super-grocery-sale-web-banner_120329-270.jpg?w=2000',
];

export default class Carousel extends React.Component {
  state = {
    isActive: 0,
  };
  changeSlider = ({ nativeEvent }) => {
    const slider = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );
    if (slider !== this.state.isActive) {
      this.setState({ isActive: slider });
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          pagingEnabled
          onScroll={this.changeSlider}
          showsHorizontalScrollIndicator={false}
          horizontal
          style={styles.scrollView}>
          {images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.image} />
          ))}
        </ScrollView>
        <View style={styles.dotContainer}>
          {images.map((x, y) => (
            <Text
              key={y}
              style={y == this.state.isActive ? styles.dots : styles.activeDot}>
              ⬤
            </Text>
          ))}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width,
    height,
    marginTop: 5,
    borderRadius: 20,
    elevation: 30,
    overflow: 'hidden',
  },
  image: {
    width,
    height,
    resizeMode: 'cover',
  },
  dotContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },

  activeDot: {
    color: '#888',
    margin: 4,
    fontSize: 22,
  },
  dots: {
    color: '#fff',
    margin: 4,
    fontSize: 22,
  },
  scrollView: {
    width,
    height,
  },
});
