import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {Colors} from "../../styles/colors";

export default function Post({heading, content, navigation, id}) {
    return <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Post', {
        postId: id
    })}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.content}>{content}</Text>
    </TouchableOpacity>
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