import {Text, TouchableOpacity, StyleSheet} from "react-native";
import {Colors} from "../../styles/colors";

export default function Link ({text, linkTo, navigation}){
    return <TouchableOpacity onPress={()=> navigation.navigate(linkTo)} >
        <Text style={styles.link}>{text}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    link: {
        color: Colors.primaryOrange,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
})