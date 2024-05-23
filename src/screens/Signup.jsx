import {
    ImageBackground,
    KeyboardAvoidingView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView
} from "react-native";
import AddProfileSvg from '../assets/icons/add-profile.svg'
import Pattern from '../assets/pattern2.png'
import {Colors} from "../styles/colors";
import Input from "../components/Input";
import ShowPasswordSvg from "../assets/icons/Eye.svg";
import {useState} from "react";
import Button from "../components/Button";
import BackButton from "../components/BackButton";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useTranslation} from "react-i18next";


const schema = yup.object().shape({ // validation schema
    email: yup.string().email('Email must be a valid').required('Email is required field\''),
    password: yup.string()
        .min(8, 'At least 8 characters')
        .max(64,'Password cannot be longer than 64 characters')
        .matches(/[a-z]/, 'Must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
        .matches(/[0-9]/, 'Must contain at least one number')
        .matches(/[@$!%*?&#]/, 'Must contain at least one special character')
        .required('Password is required'),
    name: yup.string().required('Name is required field')
});


export default function SignupScreen({navigation}) {
    const [showPassword, setShowPassword] = useState(false);
    const {t} = useTranslation()
    const {control, handleSubmit,formState: {errors}}
        = useForm({
        resolver: yupResolver(schema)
    })

    function onSubmit() {
        navigation.navigate('EnterPin')
    }

    return <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
        <BackButton navigation={navigation}/>
        <ImageBackground source={Pattern} style={{flex: 1, justifyContent: 'flex-end', backgroundColor: Colors.background}}>
            <View style={styles.main}>
                <View style={styles.header}>
                    <AddProfileSvg  width={24} height={24} style={styles.avatar}/>
                    <View>
                        <Text style={{fontSize: 15, color: Colors.textBlack}}>{t('SIGN_UP')}</Text>
                        <Text style={{fontSize: 15, color: Colors.textGray}}>{t('PERSONAL_ACCOUNT')}</Text>
                    </View>
                </View>
                <ScrollView>
                <View style={styles.form}>
                    <View>
                        <Text style={{marginLeft:10, paddingBottom: 5, color: Colors.textGray, fontSize: 15}}>{t('USERNAME')}</Text>
                        {errors.name &&
                            <Text style={styles.errorText}>{errors.name.message}</Text>
                        }
                        <Controller
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    placeholder={t('ENTER_USERNAME')}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={errors.name && styles.errorInput}
                                />
                            )}
                            name={'name'}
                            control={control}
                        />

                    </View>
                    <View>
                        <Text style={{marginLeft:10, paddingBottom: 5, color: Colors.textGray, fontSize: 15}}>{t('EMAIL')}</Text>
                        {errors.email &&
                            <Text style={styles.errorText}>{errors.email.message}</Text>
                        }
                        <Controller
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    placeholder={t('ENTER_EMAIL')}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                    style={errors.email && styles.errorInput}
                                />
                            )}
                            name={'email'}
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
                                        secureTextEntry={!showPassword}
                                        style={errors.password && styles.errorInput}
                                    />
                                )}
                                name={'password'}
                                control={control}
                            />
                            <TouchableOpacity style={styles.showIcon} onPress={() => setShowPassword(!showPassword)}>
                                <ShowPasswordSvg width={20} height={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </ScrollView>
                <View
                    behavior={'height'}
                    style={{padding: 10}}>
                    <Button value={t('CONTINUE')} onPress={handleSubmit(onSubmit)}/>
                </View>
            </View>
        </ImageBackground>
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    main: {
        flex: 0.85,
        backgroundColor: Colors.white,
        borderTopLeftRadius: 27,
        borderTopRightRadius: 27,
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
    form: {
        flex: 5,
        padding: 10,
        gap: 30,
    },
    showIcon: {
        position: 'absolute',
        right: 15,
        top: '50%',
        transform: [{ translateY: -10 }],
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