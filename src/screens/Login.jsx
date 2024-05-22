import {
    ImageBackground,
    KeyboardAvoidingView, Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import ProfileSvg from '../assets/icons/Profile.svg'
import {Colors} from "../styles/colors";
import SvgUri from "react-native-svg-uri";
import Input from "../components/Input";
import Button from "../components/Button";
import Link from "../components/Link";
import {useState} from "react";
import ShowPasswordSvg from '../assets/icons/Eye.svg'
import Pattern from '../assets/pattern2.png'
import BackButton from "../components/BackButton";

export default function LoginScreen({navigation}) {
    const [showPassword, setShowPassword] = useState(false)
    return <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, backgroundColor: Colors.background}}
    >
        <BackButton navigation={navigation}/>
        <ImageBackground source={Pattern} style={{flex:1, justifyContent: 'flex-end'}}>

        <View style={styles.container}>
            <View style={styles.header}>
            <View style={styles.avatar}>
                <SvgUri width={24} height={24} source={ProfileSvg} />
            </View>
            <View>
                <Text style={{fontSize: 15, color: Colors.textBlack}}>Login</Text>
                <Text style={{fontSize: 15, color: Colors.textGray}}>Personal Account </Text>
            </View>
            </View>
                <View style={styles.main}>
                    <View>
                        <Text style={{marginLeft:10, paddingBottom: 5, color: Colors.textGray, fontSize: 15}}>Email</Text>
                        <Input placeholder={'Enter email'}/>
                    </View>

                    <View>
                        <Text style={{marginLeft:10,paddingBottom:5, color: Colors.textGray, fontSize: 15}}>Password</Text>
                        <View style={{position: 'relative'}}>
                            <Input placeholder={'Enter password'} secureTextEntry={!showPassword}/>
                            <TouchableOpacity style={styles.showIcon} onPress={() => setShowPassword(!showPassword)}>
                                <SvgUri width={20} height={20} source={ShowPasswordSvg} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{gap: 15}}>
                        <Button value={'Continue'}/>
                        <Link text={'Create Account'} linkTo={'Signup'}/>
                    </View>
                </View>
        </View>

        </ImageBackground>

    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    container: {
        flex: 0.85,
        borderTopLeftRadius: 27,
        borderTopRightRadius: 27,
        backgroundColor: Colors.white,
        gap: 20
    },
    header: {
        flexBasis: 90,
        gap: 10,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        borderBlockColor: Colors.background,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        backgroundColor: '#F2FAF7',
        borderWidth: 1,
        borderColor: '#E9F7F2',
        borderRadius: '100%',
        padding: 10
    },
    showIcon: {
        position: 'absolute',
        right: 15,
        top: '30%',
    },
    main: {
        flex: 5,
        padding: 10,
        gap: 30,

    }
})