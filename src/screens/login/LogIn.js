import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
// import {db} from '../../firebase/firebaseConfig/firebase-config';
import database from '@react-native-firebase/database';
import {useFocusEffect} from '@react-navigation/native';
import {err} from 'react-native-svg/lib/typescript/xml';

const LogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerUserData, setRegisteredUserData] = useState([]);
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [currentUserIndex, setcurrentUserIndex] = useState(null);
  // let currentUserUid;
  // let currentUserIndex;
  // let currentUserUid;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '597473505066-5k2pupnvtdvuua95kfura52vacaq2m5n.apps.googleusercontent.com',
    });;
  }, []);;

  const navToSignUp = () => {
    settingValuesEmpty();
    navigation.navigate('signupScreen');;
  };;
  const navToDashboard = () => {
    settingValuesEmpty();
    navigation.navigate('drawer');
  };


  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      GoogleSignin.signIn()
        .then(data => {
          const currentUserInfoOfGoogle = {
            id: Number(new Date()),
            name: data.user.name,
            email: data.user.email,
            image: data.user.photo,
            phone: 'NA',
            password: 'NA',
            isLoginThroughGogle: true,
          };
          database()
          .ref(`/CurrentUser/`)
          .set({
            [currentUserInfoOfGoogle.id]: currentUserInfoOfGoogle
          })
          .then(data => {
            console.log(data, 'RESULT>>>>>>>>>>>>>>>>>>>>>');
          });

          // db.ref('CurrentUser').update({
          //   [currentUserInfoOfGoogle.id]: currentUserInfoOfGoogle,
          // });
        })
        .then(() => navToDashboard());;
      // console.log(userInfo)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  // Use to trigger any function or method with screen gets focused or unfocused.
  useEffect(() => {
      database()
      .ref('/RegisteredUsers/')
      .once('value', function (snapshort) {
        console.log('SNAPSHOP===============>',snapshort)
             let user = [];
             snapshort.forEach(item => {
            user.push(item);
          });
          setRegisteredUserData(user);
      });
    },[]);

  // getting details of current user
  // function getInfoOfEnteredData() {
  //   for (let i = 0; i < registerUserData.length; i++) {
     
  //    let _registeredUserData =  JSON.parse(JSON.stringify(registerUserData[i]));
  //    console.log('registerd..........>>>>>>>',_registeredUserData, email, password,  
  //    _registeredUserData.email,
  //    _registeredUserData.password,password == _registeredUserData.password)
  //     if (
  //       email == _registeredUserData.email &&
  //       password == _registeredUserData.password
  //     ) {
  //       console.log(_registeredUserData.id + '>>>>>>>>>>>>>>>>>>>>>>> ' + i);
  //       setCurrentUserUid(_registeredUserData.id);
  //       setcurrentUserIndex(i);
       
  //       return true;
  //     }
  //   }
  //   return false;
  // }

  const updateCurrentUser = (_currentUserIndex) => {
    const _registeredUserData = JSON.parse(JSON.stringify(registerUserData))
    const currentUserInfo = {
      id: _registeredUserData[_currentUserIndex].id,
      name: _registeredUserData[_currentUserIndex].name,
      email: _registeredUserData[_currentUserIndex].email,
      phone: _registeredUserData[_currentUserIndex].phone,
      password: _registeredUserData[_currentUserIndex].password,
      image: _registeredUserData[_currentUserIndex].image,
    };
    database()
  .ref('/CurrentUser/')
  .set({[currentUserInfo.id]: currentUserInfo})
  .then(() => console.log('Data updated.>>>>>>>>>>>>>.1111',currentUserInfo, registerUserData))
    .catch(error => {
        Alert.alert('Error : ', error);
      });;
    // db.ref('CurrentUser')
    //   .update({[currentUserInfo.id]: currentUserInfo})
    //   .then(() => {})
    //   .catch(error => {
    //     Alert.alert('Error : ', error);
    //   });
  };

  const settingValuesEmpty = () => {
    setEmail('');
    setPassword('');
  };

  const validateAndSignIn = () => {
    let dot = email.indexOf('.');
    let atrate = email.indexOf('@');
    // <<<<<< Use gmail regex
    if (!email) {
      Alert.alert('Please enter the email.');;
    } else if (!password) {
      Alert.alert('Please enter the password');;
    } else if (dot < 1 || dot - atrate < 2) {
      Alert.alert('Wrong email format!');
    } else{
      let isUserExist = false;
      console.log('egistered data ...............3434343',registerUserData)
      for (let i = 0; i < registerUserData.length; i++) {
       console.log('egistered data ...............',registerUserData)
        let _registeredUserData =  JSON.parse(JSON.stringify(registerUserData[i]));
        
         if (
           email == _registeredUserData.email &&
           password == _registeredUserData.password
         ) {
           setCurrentUserUid(_registeredUserData.id);
           setcurrentUserIndex(i);
          
            settingValuesEmpty();
            updateCurrentUser(i);
            navToDashboard();
            return;
         }
         isUserExist = false
       }
       if(!isUserExist){
        Alert.alert('No such user found234343434');
       }
      else if (!isUserExist &&  password != registerUserData[currentUserIndex].password) {
        Alert.alert('Entered the wrong password');;
      } 
      // Alert.alert('No such user found');
   else {
      //   settingValuesEmpty();
      //   updateCurrentUser();
      //   navToDashboard();
      // }
    }
  }
};

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.bigCircle} />
        <View style={styles.smallCircle} />
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <View style={styles.logoBox}>
              <Image
                style={{height: 100, width: 100, borderRadius: 25}}
                source={require('../../assets/images/logo1.png')}
              />
            </View>
            <Text style={styles.loginTitleText}>Login</Text>
            <View style={styles.hr} />
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                keyboardType="email-address"
                textContentType="emailAddress"
                value={email}
                onChangeText={email => setEmail(email)}
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize={false}
                secureTextEntry={true}
                textContentType="password"
                value={password}
                onChangeText={password => setPassword(password)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                validateAndSignIn();
              }}
              style={styles.loginButton}>
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navToSignUp();
              }}>
              <Text style={styles.registerText}>
                Don't have an account? Register Now
              </Text>
            </TouchableOpacity>
            {/* <Text style={styles.socialMediaText} >OR</Text> */}
             <View style={styles.socialLogInView}  >
                            <TouchableOpacity
                                onPress={() => {
                                    signInWithGoogle();
                                }}
                            >
                                <Image
                                    source={require('../../assets/icons/googleIcon.png')}
                                />
                            </TouchableOpacity>
                            {/* <TouchableOpacity
                            >
                                <Image
                                    source={require('../../assets/icons/metaIcon.png')}
                                />
                            </TouchableOpacity> */}
                        </View> 
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  bigCircle: {
    width: Dimensions.get('window').height * 0.7,
    height: Dimensions.get('window').height * 0.7,
    backgroundColor: '#EEBC1D',
    borderRadius: 1000,
    position: 'absolute',
    right: Dimensions.get('window').width * 0.25,
    top: -50,
  },
  smallCircle: {
    width: Dimensions.get('window').height * 0.4,
    height: Dimensions.get('window').height * 0.4,
    backgroundColor: '#1B1212',
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get('window').width * -0.2,
    right: Dimensions.get('window').width * -0.3,
  },
  centerizedView: {
    width: '100%',
    top: '15%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: '#eb4d4b',
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  loginTitleText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 10,
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: '#444',
    marginTop: 6,
  },
  socialLogInView: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputBox: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
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
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
  socialMediaText: {
    textAlign: 'center',
    paddingTop: 15,
  },
});
export default LogIn;
