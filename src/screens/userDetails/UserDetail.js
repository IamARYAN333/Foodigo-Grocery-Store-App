import React from "react";
import { Text, StyleSheet, View, FlatList, Button, SafeAreaView, Image, ScrollView, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
// import { db } from "../../firebase/firebaseConfig/firebase-config";
import { useEffect, useState } from "react";
import { CustomModal } from "../../components/editNameCustomModal";
import EditPassCustomModal from "../../components/editPassCustomModal";
import { useFocusEffect } from "@react-navigation/native";
import database from '@react-native-firebase/database';

const UserDetails = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditPassModalVisible, setIsEditPassModalVisible] = useState(false);
    let isLoggedInThroughGoogle = false;
    const [loadScreen, setLoadScreen] = useState(true);

    const [currentUserData, setCurrentUserData] = useState([]);


    useEffect(() => {
       console.log(currentUserData,'currentUserData')
       database()
       .ref('/CurrentUser/')
       .once('value', function (snapshort) {
             //         let user = [];
        //         item.forEach((childSnapshot) => {
        //             user.push(childSnapshot.val());
        //         });
        //         setCurrentUserData(user);
        //         setLoadScreen(false)
         console.log('Snapshort from user details',snapshort)
              let user = [];
              snapshort.forEach(item => {
             user.push(item);
           });
           console.log('Snapshort from user details>>>>>>>>>>>',user)
                     setCurrentUserData(JSON.parse(JSON.stringify(user)));
                setLoadScreen(false)
         // snapshort.forEach(item => {
         //   result.push(item);
         // });
         // setAddText(result);
       });
        // db.ref("CurrentUser")
        //     .once("value")
        //     .then((item) => {
        //         let user = [];
        //         item.forEach((childSnapshot) => {
        //             user.push(childSnapshot.val());
        //         });
        //         setCurrentUserData(user);
        //         setLoadScreen(false)
        //     })
        for (let i = 0; i < currentUserData.length; i++) {
            if (currentUserData[i].isSignInWithGoole) {
                isLoggedInThroughGoogle = true;
            }
        }
    }, [loadScreen])

    // setting modal visibility
    const changeModalVisible = (bool) => {
        setIsModalVisible(bool);
    }

    // setting edit Pass modal visibility
    const changeEditPassModalVisible = (bool) => {
        setIsEditPassModalVisible(bool);
    }

    return (
        <SafeAreaView style={styles.container}>
            {loadScreen ?
                <ActivityIndicator size="large" color="0000ff" />
                :
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.profileImage}>
                        { currentUserData && currentUserData.length > 0 && currentUserData[0].image ? <Image style={styles.image} resizeMode="center" source={{ uri: currentUserData[0].image }} /> : <Image style={styles.image} resizeMode="center" source={{ uri: 'https://www.sketchappsources.com/resources/source-image/profile-illustration-gunaldi-yunus.png' }} /> 
                        }
                    </View>
                    {/* <View style={styles.dm}>
                        </View> */}
                    {/* <View style={styles.active}></View>
                        <View style={styles.add}>
                        </View> */}
                    <View style={styles.infoContainer}>
                        <TouchableOpacity
                            onPress={() => changeModalVisible()}
                            style={{ height: 25, width: 25, position: "absolute", right: 0, top: 0 }} >
                            {(!isLoggedInThroughGoogle) ? <Image
                                style={{ height: 25, width: 25, }}
                                source={{ uri: 'https://img.icons8.com/ios-glyphs/344/edit--v1.png' }}
                            /> : null}

                        </TouchableOpacity>
                        {!currentUserData[0] ? <Text>Loading...</Text> : <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}> {currentUserData[0].name} </Text>}
                    </View>

                    <View style={styles.statsContainer}>
                        <View style={[styles.statsBox, { borderColor: "#DFD8C8", borderLeftWidth: 1, borderRightWidth: 1 }]}>
                            <Text style={[styles.text, { fontSize: 24 }]}>0</Text>
                            <Text style={[styles.text, styles.subText]}>Total Orders</Text>
                        </View>
                    </View>
                    <Text style={[styles.subText, styles.recent]}>Your Details</Text>
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.recentItem}>
                            <View style={styles.activityIndicator}></View>
                            <View style={{ width: 250 }}>
                                {!currentUserData[0] ? <Text>Loading...</Text> : <Text style={[styles.text, { color: "#41444B", fontWeight: "300", fontSize: 18 }]}>
                                    {currentUserData[0].email} </Text>}
                            </View>
                        </View>
                        <View style={styles.recentItem}>
                            <View style={styles.activityIndicator}></View>
                            <View style={{ width: 250 }}>
                                {!currentUserData[0] ? <Text>Loading</Text> : <Text style={[styles.text, { color: "#41444B", fontWeight: "300", fontSize: 18 }]}>
                                    {!currentUserData ? null : currentUserData[0].phone}</Text>}

                            </View>
                        </View>
                        <View style={styles.recentItem}>
                            <View style={styles.activityIndicator}></View>
                            <View style={{ width: 250 }}>
                                {/* {(isLoggedInThroughGoogle == false) ?  */}
                                <TouchableOpacity
                                    onPress={() => {
                                        changeEditPassModalVisible()
                                    }}
                                >
                                    <Text style={[styles.text, { color: 'blue', textDecorationLine: 'underline', fontWeight: "300", fontSize: 18 }]}>
                                        Edit password
                                    </Text>
                                </TouchableOpacity>
                                {/*  : null} */}
                            </View>
                        </View>
                        {currentUserData[0] ?
                            <>
                                <Modal
                                    style={styles.modal}
                                    transparent={true}
                                    animationType='fade'
                                    visible={isModalVisible}
                                    onRequestClose={() => changeModalVisible(false)}
                                >
                                    <CustomModal
                                        name={currentUserData[0].name}
                                        id={currentUserData[0].id}
                                        changeModalVisible={changeModalVisible}
                                    />
                                </Modal>
                                <Modal
                                    style={styles.modal}
                                    transparent={true}
                                    animationType='fade'
                                    visible={isEditPassModalVisible}
                                    onRequestClose={() => changeEditPassModalVisible(false)}
                                >
                                    <EditPassCustomModal
                                        name={currentUserData[0].password}
                                        id={currentUserData[0].id}
                                        changeModalVisible={changeEditPassModalVisible}
                                    />
                                </Modal>

                            </>

                            : null}
                    </View>
                </ScrollView>
            }
        </SafeAreaView>
    )

}

export default UserDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    containerForModal: {
        flex: 1,
    },
    text: {
        fontFamily: "HelveticaNeue",
        color: "#52575D"
    },
    modal: {
        elevation: 100,

    },
    image: {
        // flex: 1,
        height: 200,
        width: 200,
        borderWidth: 1
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        // width: 200,
        // height: 200,
        borderRadius: 100,
        overflow: "hidden",
        borderWidth: 1,
        alignSelf: 'center'
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16,
        width: 210,
        paddingTop: 5
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#CABFAB",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    }
});