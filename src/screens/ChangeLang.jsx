import {SafeAreaView, View, StyleSheet, Text, ScrollView, FlatList, TouchableOpacity} from "react-native";
import BackButton from "../components/BackButton";
import {Colors} from "../styles/colors";
import {useDispatch, useSelector} from "react-redux";
import {setLanguage} from "../store/slices/ProfileSlice";
import GlobeSvg from '../assets/icons/Globe.svg'
import {useTranslation} from "react-i18next";

export default function ChangeLangScreen({navigation}) {
    const selectedLang = useSelector(state => state.profile.lang);
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const languages = [
        {label: 'English', value: 'en'},
        {label: 'Arabic', value: 'ar'},
    ];

    function handleChangeLang(lang) {
        dispatch(setLanguage(lang))
    }
    return <SafeAreaView style={{flex: 1}}>
        <BackButton navigation={navigation}/>
        <View style={styles.container}>
            <Text style={styles.heading}>{t("LANGUAGE")}</Text>
            <FlatList
                data={languages}
                contentContainerStyle={{gap:15, marginTop: 10}}
                renderItem={({item}) => (
                    <TouchableOpacity
                        style={styles.language}
                        onPress={() => handleChangeLang(item.value)}
                    >
                        <View style={{flexDirection:'row', alignItems:'center',  gap: 5,}}>
                            <GlobeSvg width={24} height={24}/>
                            <Text
                                style={{fontSize: 15, fontWeight:500}}>
                                {item.label}
                            </Text>
                        </View>
                        <View style={selectedLang === item.value
                            ? {...styles.tick, ...styles.selectedLanguage}
                            : styles.tick
                        }></View>
                    </TouchableOpacity>
                )}
            />
        </View>
    </SafeAreaView>
}

const styles= StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingTop: 60
    },
    heading: {
        color: Colors.textBlack,
        fontWeight: "bold",
        fontSize: 22
    },
    tick: {
        width:20,
        height:20,
        borderRadius: '100%',
        backgroundColor: Colors.lightGray
    },
    selectedLanguage: {
        backgroundColor: Colors.primaryOrange
    },
    language: {
        borderRadius: 15,
        flexDirection: "row",
        alignItems:'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: Colors.lightGray,
        padding: 15
    }
})