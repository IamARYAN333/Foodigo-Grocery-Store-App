import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    TextInput,
    Alert
} from 'react-native';
import { db } from "../firebase/firebaseConfig/firebase-config";
const WIDTH = Dimensions.get('window').width;
const HEIGHT_MODAL = 180;

const EditPassCustomModal = (props) => {
    const [updatedPass, setUpdatedPass] = useState('');

    const closeModal = (bool) => {
        props.changeModalVisible(bool);
    }

    const updateCurrentUserPass = () => {
        if (!updatedPass) {
            Alert.alert("User name can't be empty!");
        }
        else {
            db.ref('/CurrentUser/' + props.id)
                .update({
                    password: updatedPass,
                })
            db.ref('/RegisteredUsers/' + props.id)
                .update({
                    name: updatedUser,
                })
        }
    }



    return (
        <TouchableOpacity
            disabled={true}
            style={styles.container}
        >
            <View style={styles.modal}>
                <Text style={[styles.text, { alignSelf: 'center', fontSize: 20, paddingBottom: 20 }]}>Edit User Info</Text>
                <View style={styles.modalBody}>
                    <View style={styles.inputTitle} >
                        <Text style={styles.inputTitleText} >Password : </Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={setUpdatedPass}
                            placeholder={props.password}
                        />
                    </View>
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity onPress={() => closeModal(false, 'Cancel')} style={styles.touchableOpacity} >
                        <Text style={styles.text} >Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { updateCurrentUserPass(); closeModal(false, 'Ok'); }} style={styles.touchableOpacity} >
                        <Text style={styles.text} >OK</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputTitle: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    inputTitleText: {
        fontWeight: 'bold'
    },
    modal: {
        height: HEIGHT_MODAL,
        width: WIDTH - 80,
        paddingTop: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        borderWidth: 3
    },
    textView: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        margin: 5,
        fontSize: 16,
        fontWeight: "bold",
        fontWeight: "bold",
        fontSize: 20,
        color: 'green'

    },
    btnView: {
        width: '100%',
        flexDirection: 'row'
    },
    touchableOpacity: {
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",

    },
    modalBody: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10,
        paddingLeft: 5,
        width: 220,
        margin: 2,
        backgroundColor: 'white',
        height: 35,
    },
    btn: {
        borderRadius: 10,
    }
})

export default EditPassCustomModal