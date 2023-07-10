import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Alert,
  Button,
} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
// import {db} from '../../firebase/firebaseConfig/firebase-config';
import database from '@react-native-firebase/database';
import {useFocusEffect} from '@react-navigation/native';

export default function SignUp() {
  const navigation = useNavigation();
  const [imageUri, setimageUri] = useState('https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png'); // image picker
  // text input states
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [registerUserData, setRegisteredUserData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      database()
      .ref('/RegisteredUsers/')
      .once('value', function (snapshort) {
        let user = [];
        snapshort.forEach(item => {
          user.push(item);
        });
        setRegisteredUserData(JSON.parse(JSON.stringify(user)));
      });
      // db.ref('RegisteredUsers')
      //   .once('value')
      //   .then(item => {
      //     let user = [];
      //     item.forEach(childSnapshot => {
      //       user.push(childSnapshot.val());
      //     });
      //     setRegisteredUserData(user);
      //   });
    }),
  );

  // Checking user exists or not
  const isUserExist = () => {
    console.log('RegisteredUserData',registerUserData)
    for (let i = 0; i < registerUserData.length; i++) {
      if (email.toLowerCase() == registerUserData[i].email.toLowerCase()) {
        return true;
      }
    }
    return false;
  };
  // firebase auth
  const pushDataToFirebase = () => {
    let dot = email.indexOf('.');
    let atrate = email.indexOf('@');
    let userExistOrNot = isUserExist();
    // <<<<< use email Regex here
    if (!imageUri) {
      Alert.alert('Please select the image first.');
    } else if (!userName) {
      Alert.alert('Please enter the name.');
    } else if (!email) {
      Alert.alert('Please enter the email.');
    } else if (dot < 1 || dot - atrate < 2) {
      Alert.alert('Wrong email format!');
    } else if (!phone && phone.length != 10) {
      Alert.alert('Please enter the valid phone.');
    } else if (!password && password.length < 6) {
      Alert.alert('Please enter the correct password');
    } else if (userExistOrNot == true) {
      Alert.alert('User already exist.');
    } else {
      let _id = Number(new Date());
      const userDetails = {
        id: _id,
        name: userName,
        email: email,
        phone: phone,
        image: imageUri,
        password: password,
      };
      database()
        .ref(`/RegisteredUsers/`)
        .update({
           [_id] : userDetails
        })
        .then(data => {
          console.log(data, 'RESULT');
        });
      // db.ref('RegisteredUsers')
      //   .update({[userDetails.id]: userDetails})
      //   .then(() => {})
      //   .catch(error => {
      //     Alert.alert('Error : ', error);
      //   });
      Alert.alert('Success','Registered Successfully',[
        {
          text: 'Cancel',
          onPress: () => {console.log('Cancel Pressed')},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => navigation.navigate('loginScreen')},
      ]);
    }
  };
  const navToLogIn = () => {
    navigation.navigate('loginScreen');
  };
  // firebase  conmplete
  //image picker  ....
  const openGallary = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    };
    launchImageLibrary(options, response => {
      if (!response.didCancel) {
        setimageUri(response.assets[0].uri);
      }
    });
  };
  // image picker close...
  return (
    <View style={styles.container}>
      <ScrollView style={{marginBottom: 10}}>
        <View style={styles.authBox}>
          <View style={styles.bigCircle} />
          <View style={styles.smallCircle} />
          <View style={{paddingVertical: 20}}>
            <Image
              style={styles.logoBox}
              source={require('../../assets/images/logo1.png')}
            />
          </View>

          <Text style={styles.loginTitleText}>SignUp</Text>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Profile Image</Text>
            <View style={styles.inputimage}>
              <Image style={styles.imagepic} source={{uri: imageUri}} />
              <Button
                title={'Choose Image'}
                onPress={() => {
                  openGallary();
                }}
              />
            </View>
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.input}
              autoCapitalize={false}
              value={userName}
              onChangeText={setUserName}
              placeholderTextColor={'#8c8c8c'}
              placeholder={'Xavier'}
              textContentType="name"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize={false}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor={'#8c8c8c'}
              placeholder={'xavier@abc.com'}
              keyboardType="email-address"
              textContentType="emailAddress"
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Phone</Text>
            <TextInput
              style={styles.input}
              keyboardType="phone-pad"
              value={phone}
              onChangeText={text => setPhone(text)}
              placeholderTextColor={'#8c8c8c'}
              placeholder={'965956422'}
              textContentType="telephoneNumber"
              maxLength={10}
            />
          </View>
          <View style={styles.inputBox}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              autoCapitalize={false}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              placeholder={'********'}
              placeholderTextColor={'#8c8c8c'}
              textContentType="password"
            />
          </View>

          <TouchableOpacity
            onPress={() => {
              pushDataToFirebase();
            }}
            style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Register</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navToLogIn();
            }}>
            <Text style={styles.registerText}>
              you have an account? Login Now
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: 'yellow',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
    zIndex: -1,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#1B1212',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
    zIndex: -1,
  },
  imagepic: {
    height: 80,
    width: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black',
  },
  authBox: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fafafa',
    borderRadius: 20,
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#fafafa',
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: '#eb4d4b',
    borderRadius: 30,
    alignSelf: 'center',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.2,
    // shadowRadius: 1.41,
    // elevation: 2,
  },
  loginTitleText: {
    // color: 'black',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    // marginTop: ,
    width: '100%',
    height: 70,
    // backgroundColor: '#444',
    marginTop: 6,
  },
  inputimage: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    // color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    color: 'black',
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: '#ff4757',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4,
  },

  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  registerText: {
    color: '#2196F3',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
});
