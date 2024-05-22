import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import BackButton from "../components/BackButton";
import {Colors} from "../styles/colors";
import SvgUri from "react-native-svg-uri";

export default function ProfileScreen({navigation}) {
    return <SafeAreaView style={{flex: 1}}>
        <BackButton navigation={navigation}/>
        <View style={{marginTop: 60, paddingHorizontal: 10}}>
            <Text style={styles.heading}>Settings</Text>
            <View style={styles.profile}>
                <View style={styles.avatar}></View>
                <Text style={{color: Colors.textBlack, fontSize: 15, fontWeight: 500}}>John Doe</Text>
            </View>
            <Text style={styles.smHeading}>Basic</Text>
            <View style={styles.settingsItem}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <SvgUri source={require('../assets/icons/Globe.svg')} width={24} height={24}/>
                    <Text>Language</Text>
                </View>
                <SvgUri source={require('../assets/icons/arrow-dropdown-right.svg')} width={24} height={24}/>
            </View>
            <Text style={styles.smHeading}>Other</Text>
            <View style={styles.settingsItem}>
                <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                    <SvgUri source={require('../assets/icons/exit.svg')} width={24} height={24}/>
                    <Text>Log Out</Text>
                </View>
                <SvgUri source={require('../assets/icons/arrow-dropdown-right.svg')} width={24} height={24}/>
            </View>
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