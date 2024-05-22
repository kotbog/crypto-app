import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Button from "../components/Button";
import {Colors} from "../styles/colors";
import BackButton from "../components/BackButton";
import {useState} from "react";
import SvgUri from "react-native-svg-uri";
import {useTranslation} from "react-i18next";

export default function EnterPinScreen({navigation}) {
    const {t} = useTranslation()
    const [pinCode, setPinCode] = useState('');
    function handleBtnPress(num) {
        if(pinCode.length < 5) {
            setPinCode(pinCode+num)
        }
    }
    function handleDelete() {
        if(pinCode.length > 0) {
            const delPin = pinCode.slice(0, pinCode.length - 1); //remove last number
            setPinCode(delPin);
        }
    }


    return <SafeAreaView style={{flex: 1}}>
        <BackButton navigation={navigation}/>
        <View style={styles.header}>
            <View style={styles.iconDevice}>
                <SvgUri source={require('../assets/icons/device.svg')} width={24} height={24}/>
            </View>
            <Text style={{fontSize: 15, color: Colors.textBlack, marginTop: 15}}>{t('CREATE_PIN')}</Text>
            <Text style={styles.lightText}>{t('ENTER_PIN')}</Text>
            <View style={{flexDirection: 'row', gap: 10, marginTop: 15}}>
                {
                    Array.from({ length: 5 }).map((item, index) =>
                        <View style={{
                            ...styles.pinDot,
                            backgroundColor:  index < pinCode.length
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
                    <SvgUri source={require('../assets/icons/delete.svg')} width={30} height={30}/>
                </TouchableOpacity>
        </View>
        <View style={styles.btnGroup}>
            <Button value={t('CONTINUE')} onPress={() => navigation.navigate('HomeStack')}/>
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