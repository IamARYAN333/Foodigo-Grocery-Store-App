import React, { Component, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Button,
  Modal,
  Alert,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import database from '@react-native-firebase/database';
import Header from '../../components/Header';
import {
  colors,
  fonts,
} from '../../res';
import Gap from '../../components/Gap';
import { RadioButton } from 'react-native-paper';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { emptyCart } from '../../store/actions/Action';
import { connect } from 'react-redux';

// import { ScrollView } from 'react-native-gesture-handler';
// import {db} from '../../firebase/firebaseConfig';
// import {collection, getDocs, addDoc} from 'firebase/firestore';

export default function OrderConfirmation({ navigation, props }) {
  const [orderList, setOrderList] = useState({})
  const route = useRoute();
  const dispatch = useDispatch()

  useEffect(() => {
    // getOrders();
    getCurrentProductInfo()
  }, []);

  const getCurrentProductInfo = async () => {
    try {
      const value = await AsyncStorage.getItem('CURRENT_PRODUCT_IN_CART')
      if (value !== null) {
        console.log('JSON.parse(value)', JSON.parse(value))
        const _value = JSON.parse(value)
        database()
          .ref(`/Orders/${_value['productId']}`)
          .update({
            orderStatus: 'Confirmed',
            deliveryDate: getDeliveryDate()
          })
          .then(() => console.log('Data updated.'));
        setOrderList(JSON.parse(value))
      }
    } catch (e) {
      // error reading value
    }
  }

  const getDeliveryDate = () => {
    const deliveyType = orderList['deliveryType']
    const deliveryDate = deliveyType === 'Express' ? moment().add(1, 'days') : moment().add(3, 'days')
    console.log('deliveryDate......', deliveryDate.toString())
    return moment(deliveryDate).format('dddd D MMMM')
  }

  const getSelectedAddress = () => {
    // name: name,
    // addressLine1: addressLine1,
    // addressLine2: addressLine2,
    // pincode: pincode,
    // mobile: mobileNo,
    return `${route.params.selectedAdd.addressLine1}, ${route.params.selectedAdd.addressLine2}, ${route.params.selectedAdd.pincode}`
  }

  return (
    console.log('OrderList...........?????????//', orderList[orderList['product']]),
    <ScrollView>
      <View style={styles.mainContainer}>
        <Header onPress={() => navigation.goBack()} navigation={navigation} navigateFrom={'Payment'} />
        <View style={styles.wrapperTittle}>
          <Text style={styles.tittle}>{'Order Confirmation'}</Text>
        </View>
        <Image style={{ width: '100%', height: 200 }} source={require('../../res/images/Icons/confirmImage.webp')} />
        <Text style={[styles.thankYouTitle, { marginVertical: 5 }]}>{'Thank you for your order '}</Text>
        <Text style={styles.thankYouTitle}>{'An email confirmation has been sent to your email-id'}</Text>

        <Text style={styles.tittle}>Order Summary</Text>
        <View style={{ borderColor: colors.grey, borderWidth: 1,borderRadius:10, marginVertical: 20, padding: 10 }}>
          <View style={{ flexDirection: 'row', }}>
            <Text>Order No: </Text>
            <Text>{orderList['productId']}</Text>
          </View>

          <View style={{ flexDirection: 'row', }}>
            <Text>Order Total: </Text>
            <Text>{orderList['totalCost']}</Text>
          </View>

          <View style={{ flexDirection: 'row', }}>
            <Text>Delivered by: </Text>
            <Text>{getDeliveryDate()}</Text>
          </View>

          <View style={{ flexDirection: 'row', }}>
            <Text>Delivered To: </Text>
            <View style={{ flexDirection: 'column' }}>
              <Text>{route.params.selectedAdd.name}</Text>
              <Text>{getSelectedAddress()}</Text>
              <Text>{route.params.selectedAdd.mobile}</Text>
            </View>

          </View>
        </View>
        <View>
          {orderList[orderList['product']] && orderList[orderList['product']].length && orderList[orderList['product']].length > 0 &&
            orderList[orderList['product']].map((product) => (
              <View style={styles.productView}>
                <Image
                  style={styles.productImage}
                  source={product.icon}
                />
                <View style={styles.productMiddleView}>
                  <Text style={styles.productTitle}>{product.title}</Text>
                  <Text style={styles.productCompanyTitle}>
                    {product.type}
                  </Text>
                </View>
                <View>
                  <Text>₹{Number(product.price).toFixed(2)}</Text>
                  <Text style={{ textAlign: 'right' }}>{product.qty}</Text>
                </View>
              </View>
            ))}

          <View style={styles.subtotalView}>
            <Text style={styles.subtotalText}></Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text style={styles.tittle}>Payment Details</Text>
        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
          <View>
            <Text style={{ textAlign: 'right', fontSize: 16, fontWeight: 'bold' }}>Cash on Delivery</Text>
            <Text style={{ textAlign: 'right' }}>{orderList['deliveryType'] === 'Express' ? 'Express Shipping' : orderList['deliveryType'] }</Text>
          </View>
          <View>
            <Text style={{ textAlign: 'right' }}>₹{Number(orderList['totalCost']).toFixed(2)}</Text>

          </View>

        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => {
          dispatch(emptyCart())
          navigation.navigate('drawer')}}>
          <Text style={styles.checkoutButtonText}>
            Continue Shopping
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor: '#3120E0',
    padding: 10,
    height: '100%',
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    elevation: 5,
    marginBottom: 10,
    marginHorizontal: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    },
  },
  wrapperTittle: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  tittle: {
    fontSize: 20,
    fontWeight:'bold',
    fontFamily: fonts.SemiBold,
    color: '#ff6863',
  },
  thankYouTitle: {
    fontSize: 16,
    fontWeight:'bold',
    textAlign:'justify',
  },
  productView: {
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: 'rgba(140, 250, 145,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 8,
    // borderRadius: 10,
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    // shadowRadius: 2,
    elevation: 2,
    marginTop: 14,
  },
  productImage: {
    width: 50,
    height: 60,
    alignSelf: 'center',
  },
  productMiddleView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 20,
    fontWeight: '500',
  },
  productCompanyTitle: {
    fontSize: 16,
    fontWeight: '300',
  },
  productRightView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkoutButton: {
    backgroundColor: 'rgba(148, 156, 255, 1.0)',
    paddingVertical: 14,
    marginTop: 30,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
})

// export default connect(mapStateToProps, mapDispatchToProps)(OrderConfirmation)