import {ImageBackground, SafeAreaView, StyleSheet, Image, Text, TouchableOpacity, View} from "react-native";
import Button from "../components/Button";
import {Colors} from "../styles/colors";
import backgroundImage from '../assets/pattern.png'
import Crypto1 from '../assets/options/crypto-1.png'
import Crypto2 from '../assets/options/crypto-2.png'
import Crypto3 from '../assets/options/crypto-3.png'
import Etf1 from '../assets/options/etf-1.png'
import Etf2 from '../assets/options/etf-2.png'
import Etf3 from '../assets/options/etf-3.png'
import Estate1 from '../assets/options/estate-1.png'
import Estate2 from '../assets/options/estate-2.png'
import Estate3 from '../assets/options/estate-3.png'
import Commodity1 from '../assets/options/commodity-1.png'
import Commodity2 from '../assets/options/commodity-2.png'
import Commodity3 from '../assets/options/commodity-3.png'
import Pending1 from '../assets/options/pending-1.png'
import Pending2 from '../assets/options/pending-2.png'
import BitcoinSvg from '../assets/Vector.svg'
import {WelcomeOption} from "../components/WelcomeOption";
import SvgUri from "react-native-svg-uri";
import Link from "../components/Link";




export default function WelcomeScreen({navigation}) {

    const options = [
        {
            text: 'Crowd lending',
            icons: [Pending2, Pending1, Pending2]
        },
        {
            text: 'Crowd real estate',
            icons: [Estate1, Estate2, Estate3]
        },
        {
            text: 'Commodities',
            icons: [Commodity1, Commodity2, Commodity3]
        },
        {
            text: 'ETFs',
            icons: [Etf1, Etf2, Etf3]
        },
        {
            text: 'Crypto',
            icons: [Crypto1, Crypto2, Crypto3]
        }
    ]
    return <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <View style={styles.options}>
                    <View style={styles.column1}>
                        <View style={styles.mainLogo}>
                            <SvgUri width="50" source={BitcoinSvg} />
                        </View>
                        {
                            [options[1], options[3]].map((opt, index) =>
                                <WelcomeOption icons={opt.icons} text={opt.text} key={index}/>)
                        }
                    </View>

                    <View style={styles.column2}>
                        {
                            [options[0], options[2], options[4]].map((opt, index) =>
                                <WelcomeOption icons={opt.icons} text={opt.text} key={index}/>)
                        }
                    </View>
                </View>
                <View style={styles.buttonGroup}>
                    <Link text={'Log In'} linkTo={'Login'} navigation={navigation}/>
                    <Button value={'Sign up'} onPress={() => navigation.navigate('Signup')}/>
                </View>
            </View>
            <ImageBackground source={backgroundImage}
                             resizeMode={'cover'}
                             style={{width:'100%', height: '50%', position:'absolute', zIndex: -1, bottom: '-15%'}}
            />
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    main: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    buttonGroup: {
        flex: 3,
        justifyContent: "flex-end",
        gap: 15
    },
    options: {
        flex: 7,
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap:10,
        justifyContent: "space-between"
    },
    mainLogo: {
        borderRadius: 16,
        paddingVertical: 30,
        backgroundColor: Colors.primaryOrange,
        justifyContent: 'center',
        alignItems: 'center'
    },
    column1: {
        flex: 1,
        gap:10
    },
    column2: {
        flex: 1,
        paddingTop: 50,
        gap:10
    }
})