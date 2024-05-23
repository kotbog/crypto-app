import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import BackButton from "../components/BackButton";
import {Colors} from "../styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../store/slices/AuthSlice";
import {useTranslation} from "react-i18next";
import GlobeSvg from '../assets/icons/Globe.svg'
import LogOutSvg from '../assets/icons/exit.svg'
import ArrowRightSvg from '../assets/icons/arrow-dropdown-right.svg'
import useAuth from "../hooks/useAuth";
import * as SecureStore from "expo-secure-store";

export default function ProfileScreen({navigation}) {
    const dispatch = useDispatch();
    const auth = useAuth()
    const {t} = useTranslation();
    const user = useSelector((state) => state.auth.user)
    async function handleLogOut() {
        dispatch(logout());
        await SecureStore.deleteItemAsync('pin')
    }
    function handleChangeLang() {
        navigation.navigate('ChangeLangScreen');
    }

    return <SafeAreaView style={{flex: 1}}>
        <BackButton navigation={navigation}/>
        <View style={{marginTop: 60, paddingHorizontal: 10}}>
            <Text style={styles.heading}>{t("SETTINGS")}</Text>
            <View style={styles.profile}>
                <View style={styles.avatar}></View>
                <Text style={{color: Colors.textBlack, fontSize: 15, fontWeight: 500}}>{`${user.firstName} ${user.lastName}`}</Text>
            </View>
            <Text style={styles.smHeading}>{t("BASIC")}</Text>
            <TouchableOpacity style={styles.settingsItem} onPress={handleChangeLang}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <GlobeSvg width={24} height={24}/>
                    <Text>{t("LANGUAGE")}</Text>
                </View>
                <ArrowRightSvg width={24} height={24}/>
            </TouchableOpacity>
            <Text style={styles.smHeading}>{t("OTHER")}</Text>
            <TouchableOpacity style={styles.settingsItem} onPress={handleLogOut}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <LogOutSvg width={24} height={24}/>
                    <Text>{t("LOG_OUT")}</Text>
                </View>
                <ArrowRightSvg width={24} height={24}/>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
}

const styles = StyleSheet.create({
    heading: {
        color: Colors.textBlack,
        fontWeight: "bold",
        fontSize: 22
    },
    avatar: {height: 30, width: 30, backgroundColor: Colors.background, borderRadius: "100%"},
    profile: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: Colors.lightGray,
        borderRadius: 16
    },
    smHeading: {
        color: Colors.textGray,
        fontSize: 15,
        paddingHorizontal: 10,
        marginTop: 20
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'space-between',
        borderWidth: 1,
        borderColor: Colors.lightGray,
        borderRadius: 16,
        paddingHorizontal: 15,
        paddingVertical: 15,
        marginTop: 10
    }
})