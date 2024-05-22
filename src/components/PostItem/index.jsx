import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {Colors} from "../../styles/colors";

export default function PostItem({id, name, navigation}) {
    return <TouchableOpacity style={styles.container}
        onPress={() => navigation.navigate('Post', {
            postId: id
        })}
    >
        <Text style={{color: Colors.textBlack, fontSize: 15, fontWeight: 500}}>ID: {id}</Text>
        <Text style={{color: Colors.textGray, fontSize: 15}}>Name: {name}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        marginVertical:5
    },

})