import React, {Component, useEffect, useState} from 'react';
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
  ActivityIndicator,
  TextInput,
} from 'react-native';
import Header from '../../components/Header';
import {
  colors,
  fonts,
} from '../../res';
import Gap from '../../components/Gap';
import database from '@react-native-firebase/database';
import { RadioButton } from 'react-native-paper';
import { FAB } from 'react-native-paper';
// import {db} from '../../firebase/firebaseConfig';
// import {collection, getDocs, addDoc} from 'firebase/firestore';

export default function SelectAddress({navigation}) {
  const [address, setAddress] = useState([]);
  const [name, setName] = useState('');
  const [addressLine1, setAddLine1] = useState('');
  const [addressLine2, setAddLine2] = useState('');
  const [pincode, setPincode] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalStatus, setModalStatus] = useState('Save')
  const [selectedAddress, setSelectedAddress] = useState({});

//   const addressRef = collection(db, 'address');

  useEffect(() => {
    getAddress();
  }, []);

  const getAddress = async () => {
    setIsLoading(true)
    database()
      .ref('/Address/')
      .once('value', function (snapshort) {
        setIsLoading(false);
        let address = [];
        snapshort.forEach(item => {
          address.push(item);
        });
        let _address = JSON.parse(JSON.stringify(address));
        setSelectedAddress(_address[0])
        setAddress(_address);
    });

   
  };

  //-------add address--------------
  const addAddress = async () => {
    if (!name && !addressLine1 && !addressLine2 && !pincode && !mobileNo) {
      alert('Fields cannot be empty..');
      setModalVisible(!modalVisible);
      return;
    }
    
    let _id = modalStatus === 'Save' ? Number(new Date()) : selectedAddress.id;

    const _address = {
      id: _id,
      name: name,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      pincode: pincode,
      mobile: mobileNo,
    }

    database()
    .ref(`/Address/`)
      .update({
        [_id] : _address
     })
    .then(data => {
      console.log(data, 'RESULT');
    });
    setModalVisible(!modalVisible);
    // await addDoc(addressRef, );
    getAddress();
  };

  editAddress = (_address) => {
    setSelectedAddress(_address)
    setName(_address.name)
    setAddLine1(_address.addressLine1)
    setAddLine2(_address.addressLine2)
    setPincode(_address.pincode)
    setMobileNo(_address.mobile)
    setModalStatus('Edit')
    setModalVisible(true)
  }

  deleteAddress = async (_address) => {
    // setIsLoading(true);
    await database().ref(`/Address/${_address.id}`).remove()
    getAddress();
  }

  resetValue = () => {
    setName('')
    setAddLine1('')
    setAddLine2('')
    setPincode('')
    setMobileNo('')
  }

  const clickHandler = () => {
    //function to handle click on floating Action Button
    alert('Floating Button Clicked');
  };

  return (
    <View style={styles.mainContainer}>
       <ActivityIndicator size="large" color="#00ff00" animating={isLoading}/>
        <Header onPress={() => navigation.goBack()} navigation={navigation} navigateFrom={'Payment'}/>
          <View style={styles.wrapperTittle}>
            <Text style={styles.tittle}>{'Select Address'}</Text>
          </View>
      <FlatList
        data={address}
        keyExtractor={item => item.id}
        renderItem={({item,index}) => (
          <View style={styles.card}>
            {/* <View style={styles.cardContent}> */}
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 0.3}}>
                <RadioButton
                  value={`${index}`}
                  status={ checked === index ? 'checked' : 'unchecked' }
                  onPress={() => {setSelectedAddress(item),setChecked(index)}}
                />
              </View>
              <View style={{ flexDirection: 'row', flex: 1}}>
              <TouchableOpacity
                style={{ margin: 10 }}
                onPress={() => navigation.navigate('ConfirmAddress', {item})}>
                <View style={styles.cardText}>
                  <Text style={styles.titleText}>Name: </Text>
                  <Text>{item.name}</Text>
                </View>
                <View style={[{ flexDirection: 'row'}, {flex: 1.5}]}>

                  <Text style={[styles.titleText, {flex: 1.5, textAlign: 'center', flexDirection: 'column'}]}>Address: </Text>
                  <Text style={{ flex: 2}}>{`${item.addressLine1}, ${item.addressLine2}, ${item.pincode}`} </Text>
                </View>
                <View style={styles.cardText}>
                  <Text style={styles.titleText}>Mobile no: </Text>
                  <Text>{item.mobile}</Text>
                </View>
              </TouchableOpacity>
              {/* </View> */}
            </View>
            <View style={{ flexDirection: 'row',}}>
              <View style={{ margin: 10 }}>
                <TouchableOpacity onPress={()=>editAddress(item)}>
                  <Image style={{ height: 25, width: 25, marginBottom: 10}} source={require('../../res/images/Icons/edit.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>Alert.alert('Delete Address', 'Are you sure want to delete the selected address?', [
      {
        text: 'Cancel',
        onPress: () => {console.log('Cancel Pressed'), setIsLoading(false)},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => deleteAddress(item)},
    ])}>
                  <Image style={{ height: 25, width: 25}} source={require('../../res/images/Icons/delete.png')}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}></FlatList>

      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(!modalVisible)}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 18, fontWeight: '500', textAlign: 'center', marginTop: -20 }}>{modalStatus === 'Save'? 'Add Address' : 'Edit Address'}</Text>
            <TouchableOpacity style={{position: 'absolute', alignSelf: 'flex-end', margin: 20, paddingRight: 20 }}  onPress={()=>setModalVisible(!modalVisible)} ><Image style={{ height: 20, width: 20, }} source={require('../../assets/images/close.png')}/></TouchableOpacity>
            <Text style={{ paddingVertical: 10, color: colors.black }}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setName(text)}
              value={name}
              placeholder="Enter your name"
            />
            <Text style={{ paddingVertical: 10, color: colors.black }}>Address Line 1</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setAddLine1(text)}
              value={addressLine1}
              placeholder="Enter your address"
            />
            <Text style={{ paddingVertical: 10, color: colors.black }}>Address Line 2</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setAddLine2(text)}
              value={addressLine2}
              placeholder="Enter your address"
            />
            <Text style={{ paddingVertical: 10, color: colors.black }}>Pincode</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setPincode(text)}
              maxLength={6}
              value={pincode}
              placeholder="Enter your pincode"
              keyboardType="numeric"
            />
            <Text style={{ paddingVertical: 10, color: colors.black }}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setMobileNo(text)}
              maxLength={10}
              value={mobileNo}
              placeholder="Enter your mobile no"
              keyboardType="numeric"
            />
            <Gap height={20}/>
            <TouchableOpacity style={styles.button}  onPress={() => addAddress()}>
              <Text style={styles.text}>Save</Text>
            </TouchableOpacity>
            {/* <Button
              title="Save"
              onPress={() => {
                addAddress();
                setModalVisible(!modalVisible);
              }}
            /> */}
          </View>
        </Modal>
      </View>
      <TouchableOpacity style={{ height: 80, width: 80, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EBF8E9', position: 'absolute', bottom: 80,right: 20, shadowColor: '#000',
    shadowOpacity: 1,
    shadowOffset: {
      width: 3,
      height: 3,
    }, borderColor: '#ACDDDE'}} onPress={()=>Alert.alert('Confirmation', 'Thankyou for shopping with us.', [
      {
        text: 'Cancel',
        onPress: () => {console.log('Cancel Pressed')},
        style: 'cancel',
      },
      {text: 'OK', onPress: () => navigation.navigate('OrderConfirmation',{selectedAdd: selectedAddress })},
    ])}>
        <Image source={require('../../res/images/Icons/fast-delivery.png')} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => {resetValue(),setModalStatus('Save'),setModalVisible(true)}}>
          <Text style={styles.text}>Add new address</Text>
      </TouchableOpacity>
    </View>
  );
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
  cardContent: {
    borderWidth: 1,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  cardText: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
  },
  wrapperTittle: {
    paddingHorizontal: 20,
    paddingBottom: 20
  },
  tittle: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    color: colors.grey,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#60A3D9',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  // touchableOpacityStyle: {
  //   position: 'absolute',
  //   width: 50,
  //   height: 50,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   right: 30,
  //   bottom: 30,
  // },
  // floatingButtonStyle: {
  //   resizeMode: 'contain',
  //   width: 50,
  //   height: 50,
  //   //backgroundColor:'black'
  // },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 60,
  },
});
