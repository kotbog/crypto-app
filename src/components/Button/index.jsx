import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {Colors} from "../../styles/colors";

export default function Button({value, ...props}) {
    return <TouchableOpacity style={styles.main} {...props}>
        <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: Colors.primaryOrange,
        borderRadius: 16,
        paddingVertical: 15,
    },
    text: {
        color: Colors.white,
        fontWeight: "bold",
        fontSize: 15,
        textAlign: 'center'
    }
})