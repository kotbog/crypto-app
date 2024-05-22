import {TouchableOpacity, StyleSheet, Text, TextInput} from "react-native";
import {Colors} from "../../styles/colors";

export default function Input({ style, ...props}) {
    return <TextInput
        style={{...styles.main, ...style}}
        {...props}/>
}

const styles = StyleSheet.create({
    main: {
        borderWidth: 1,
        borderColor: Colors.lightGray,
        color: Colors.textBlack,
        borderRadius: 16,
        fontSize: 15,
        paddingVertical: 15,
        paddingHorizontal: 15
    }
})