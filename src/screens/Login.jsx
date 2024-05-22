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
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../store/slices/AuthSlice";
import {err} from "react-native-svg";
import {useTranslation} from "react-i18next";


const schema = yup.object().shape({ // validation schema
    username: yup.string().required('Username is required field\''),
    password: yup.string()
        .required('Password is required'),
});


export default function LoginScreen({navigation}) {
    const dispatch = useDispatch();
    const {t} = useTranslation()
    const {control, handleSubmit, getValues,formState: {errors}}
        = useForm({
        resolver: yupResolver(schema)
    })

    const [showPassword, setShowPassword] = useState(false);
    const {error, loading, user} = useSelector((state) => state.auth);

    function onLoginSubmit() {
        const username = getValues('username');
        const password = getValues('password');
        dispatch(loginUser({username, password}));
    }

    if(!error && user) navigation.navigate('HomeStack')

    return <View
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
                <Text style={{fontSize: 15, color: Colors.textBlack}}>{t('LOGIN')}</Text>
                <Text style={{fontSize: 15, color: Colors.textGray}}>{t('PERSONAL_ACCOUNT')}</Text>
            </View>
            </View>
                <View style={styles.main}>
                    <View>
                        {
                            (error && !loading) && <Text style={{color: Colors.error, paddingBottom:10, fontSize:15}}>Invalid username or password</Text>
                        }
                        <Text style={{marginLeft:10, paddingBottom: 5, color: Colors.textGray, fontSize: 15}}>{t('USERNAME')}</Text>
                        {errors.email &&
                            <Text style={styles.errorText}>{errors.username.message}</Text>
                        }
                        <Controller
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    placeholder={t('ENTER_USERNAME')}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={errors.username && styles.errorInput}
                                />
                            )}
                            name={'username'}
                            control={control}
                        />
                    </View>

                    <View>
                        <Text style={{marginLeft:10,paddingBottom:5, color: Colors.textGray, fontSize: 15}}>{t('PASSWORD')}</Text>
                        {errors.password &&
                            <Text style={styles.errorText}>{errors.password.message}</Text>
                        }
                        <View style={{position: 'relative'}}>
                            <Controller
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <Input
                                        placeholder={t('ENTER_PASSWORD')}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={errors.password && styles.errorInput}
                                        secureTextEntry={!showPassword}
                                    />
                                )}
                                name={'password'}
                                control={control}

                            />
                            <TouchableOpacity style={styles.showIcon} onPress={() => setShowPassword(!showPassword)}>
                                <SvgUri width={20} height={20} source={ShowPasswordSvg} />
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{gap: 15}}>
                        <Button value={t('CONTINUE')} onPress={handleSubmit(onLoginSubmit)}/>
                        <Link text={t('CREATE_ACCOUNT')} linkTo={'Signup'}/>
                    </View>
                </View>
        </View>

        </ImageBackground>

    </View>
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
        top: '50%',
        transform: [{ translateY: -10 }],
    },
    main: {
        flex: 5,
        padding: 10,
        gap: 30,
    },
    errorText: {
        fontSize: 15,
        color: Colors.error,
        marginLeft: 10,
        paddingBottom: 5
    },
    errorInput: {
        borderColor: Colors.error
    }
})