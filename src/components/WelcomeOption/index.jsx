import {View, StyleSheet, Image, Text} from "react-native";
import {Colors} from "../../styles/colors";

export function WelcomeOption({text, icons}) {

    return <View style={styles.container}>
        <View style={styles.options}>
            <Image source={icons[0]} style={{width:35, height: 35, resizeMode: 'contain', marginRight: -8}}/>
            <Image source={icons[1]} style={{width:35, height: 35, resizeMode: 'contain', zIndex: 20}}/>
            <Image source={icons[2]} style={{width:35, height: 35, resizeMode: 'contain', marginLeft: -8}}/>
        </View>
        <Text>{text}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: Colors.white,
        minWidth: '48%',
        paddingVertical:20,
        gap: 10,
        minHeight: 150
    },
    options: {
        flexDirection: 'row'
    },
    text: {
        color: Colors.textGray,
        fontSize: 12
    }
})