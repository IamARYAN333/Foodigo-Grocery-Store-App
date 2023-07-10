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
import {useFocusEffect} from '@react-navigation/native';
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

export default function MyOrders({ navigation, props }) {
  const [myOrders, setMyOrders] = useState({})
  const [myOrdersList, setMyOrdersList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
        setIsLoading(true)
        database()
          .ref('/Orders/')
          .once('value', function (snapshort) {
            setIsLoading(false);
            let orders = [];
            snapshort.forEach(item => {
                orders.push(item);
            });
            console.log('Orderd from My Orders',snapshort)
            let _orders = JSON.parse(JSON.stringify(orders));
            const _ordersList = []
            for(_ord in _orders){
                _orders[_ord].orderStatus === 'Confirmed' && _ordersList.push(_orders[_ord])
            }
            setMyOrders(_orders)
            setMyOrdersList(_ordersList)
        });
    },[])
  );

    const _renderItem = (item) => {
        return (
          <View style={{ borderColor: '#ff6863',backgroundColor:'#D3D3D3', borderWidth: 2, marginVertical: 20, paddingHorizontal: 20, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text>Order Id: {item.productId}</Text>
            <View style={{ backgroundColor: '#90EE90', height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
              <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>{item.orderStatus}</Text>
            </View>
            </View>
            <Text style={styles.tittle}>Item Containing: </Text>
        <View>
          {item.product.map((product) => (
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

        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text>{item.deliveryDate}</Text>
            <View style={{  height: 30, justifyContent: 'center', alignItems: 'center', borderRadius: 5}}>
              <Text style={{ fontSize: 16, paddingHorizontal: 5 }}>₹{Number(item.totalCost).toFixed(2)}</Text>
             
            </View>
            </View>
            <Text style={{ fontSize: 16, paddingHorizontal: 5, textAlign: 'right' }}>{item.deliveryType}</Text>
              <Text style={{ fontSize: 16, paddingHorizontal: 5, textAlign: 'right' }}>{item.PaymentMethod}</Text>
           
        </View>
        )
    }

  return (
    
      <View style={styles.mainContainer}>
        <View style={styles.wrapperTittle}>
          <Text style={styles.tittle}>{'My Orders'}</Text>
        </View>
        <FlatList
            data={myOrdersList}
            renderItem={({item}) => _renderItem(item)}
            extraData={myOrders}
            keyExtractor={item => item.id}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
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
    // paddingHorizontal: 20,
    paddingTop: 20
  },
  tittle: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    color: colors.grey,
  },
  thankYouTitle: {
    fontSize: 16
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