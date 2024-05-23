import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Button from "../components/Button";
import {Colors} from "../styles/colors";
import BackButton from "../components/BackButton";
import {useEffect, useState} from "react";
import DeviceSVG from "../assets/icons/device.svg"
import DeleteSVG from "../assets/icons/delete.svg"
import {useTranslation} from "react-i18next";
import {getValueFor, saveSecureValue} from "../libs/SecureStore";
import {useSelector} from "react-redux";
import * as LocalAuthentication from 'expo-local-authentication';
import useAuth from "../hooks/useAuth";

export default function EnterPinScreen({navigation}) {
    const {t} = useTranslation()
    const [pinCode, setPinCode] = useState('');
    const [pinCodeRepeat, setPinCodeRepeat] = useState('');
    const [isRepeatPin, seIsRepeatPin] = useState(false);
    const [retrievedPinCode, setRetrievedPinCode] = useState(null);
    const user = useSelector(state => state.auth.user)
    useEffect(() => {
        const handleGetPinCode = async () => {
            const pin = await getValueFor('pin')
            setRetrievedPinCode(pin);
        };
        handleGetPinCode()
    }, []);


    useEffect(() => {
        const loginWithBiometric = async () => {
            try {
                const { success } = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Authenticate to login',
                });

                if (success) {
                    navigation.navigate("HomeStack")
                } else {
                    console.log('Biometric authentication failed.');
                }
            } catch (error) {
                console.error('Error during biometric authentication:', error);
            }
        };
        loginWithBiometric()
    }, [])

    function handleBtnPress(num) {
        if(isRepeatPin) {
            if(pinCodeRepeat.length < 5) {
                setPinCodeRepeat(pinCodeRepeat + num)
            }
        }            else if(pinCode.length < 5){
            setPinCode(pinCode + num)
        }

    }
    function handleDelete() {
        let delPin;  //remove last number
        if(!isRepeatPin) {
            delPin = pinCode.slice(0, pinCode.length - 1);
            setPinCode(delPin);
        } else {
            delPin = pinCodeRepeat.slice(0, pinCodeRepeat.length - 1);
            setPinCodeRepeat(delPin);
        }
    }

    async function handleSubmit() {
        if(retrievedPinCode && retrievedPinCode === pinCode) {
            navigation.navigate('HomeStack');
        } else if(!retrievedPinCode && isRepeatPin) {
            if(pinCodeRepeat === pinCode) {
                await saveSecureValue('pin',pinCode);
                navigation.navigate('HomeStack');
            }
        } else if(!retrievedPinCode && !isRepeatPin) {
            seIsRepeatPin(true);
        }
    }

    return <SafeAreaView style={{flex: 1}}>
        <View style={styles.header}>
            <View style={styles.iconDevice}>
                <DeviceSVG width={24} height={24}/>
            </View>
            <Text style={{fontSize: 15, color: Colors.textBlack, marginTop: 15}}>
                {
                   retrievedPinCode
                       ? t('ENTER_YOUR_PIN')
                       :  isRepeatPin
                           ? t('REPEAT_PIN')
                           : t('CREATE_PIN')
                }
            </Text>
            <Text style={styles.lightText}>{t('ENTER_PIN')}</Text>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 15}}>
                {
                    Array.from({ length: 5 }).map((item, index) =>
                        <View style={{
                            ...styles.pinDot,
                            backgroundColor:  index < (isRepeatPin ? pinCodeRepeat.length : pinCode.length)
                                ? Colors.primaryOrange
                                : '#C1C4CB'
                        }} key={index}></View>
                    )
                }
            </View>
        </View>
        <View style={styles.numpad}>
            {
                Array.from({ length: 9 }).map((item, index) =>
                    <TouchableOpacity
                        style={styles.numBtn}
                        key={index}
                        onPress={()=>handleBtnPress(index + 1)}>
                        <Text style={{fontSize: 28, color: Colors.textBlack, fontWeight: 700}}>{index + 1}</Text>
                    </TouchableOpacity>
                )
            }
                <View style={styles.numBtn}></View>
                <TouchableOpacity style={styles.numBtn} onPress={()=>handleBtnPress(0)}>
                    <Text style={{fontSize: 28, color: Colors.textBlack, fontWeight: 700}}>0</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.numBtn} onPress={handleDelete}>
                    <DeleteSVG width={30} height={30}/>
                </TouchableOpacity>
        </View>
        <View style={styles.btnGroup}>
            <Button value={t('CONTINUE')} onPress={handleSubmit}/>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    numpad: {
        flex: 4.5,
        borderTopWidth: 1,
        borderColor: Colors.lightGray,
        flexDirection: "row",
        flexWrap: "wrap",
        paddingVertical: 10
    },
    header: {
        flex: 4.5,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center"
    },
    btnGroup: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: Colors.lightGray
    },
    pinDot: {
        width: 20,
        height: 20,
        borderRadius: '100%'
    },
    lightText: {
        color: Colors.textGray,
        fontSize: 15,
        marginTop: 40
    },
    numBtn: {
        justifyContent: 'center',
        alignItems:'center',
        flexBasis: '33%',
        height: '25%',

    },
    iconDevice: {
        backgroundColor: '#F2FAF7',
        borderWidth: 2,
        borderColor: '#E9F7F2',
        borderRadius: '100%',
        padding: 10
    }
})