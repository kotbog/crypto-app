import {TouchableOpacity, StyleSheet} from "react-native";
import BackSvg from "../../assets/icons/arrow-dropdown.svg";

export default function BackButton({navigation}) {
    return <TouchableOpacity onPress={() => navigation.goBack()} style={styles.main}>
        <BackSvg width={24} height={24}  />
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    main: {
        zIndex: 100,
        position: 'absolute',
        top: 40,
        left: 10,
    }
})