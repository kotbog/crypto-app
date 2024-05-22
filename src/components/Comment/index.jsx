import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Colors} from "../../styles/colors";

export default function Comment({username, email, content}) {
    return <View style={styles.container} >
        <Text style={styles.heading}>{username}</Text>
        <Text style={{...styles.content, color: Colors.textBlack}}>{email}</Text>
        <Text style={styles.content}>{content}</Text>
    </View>
}

const styles = StyleSheet.create({
    heading: {
        color: Colors.textBlack,
        fontWeight: "semibold",
        fontSize: 18

    },
    content: {
        color: Colors.textGray,
        fontSize: 16
    },
    container: {
        backgroundColor: Colors.white,
        padding: 10,
        gap: 10,
        borderRadius: 16
    }
})