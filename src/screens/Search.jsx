import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import Input from "../components/Input";
import {Colors} from "../styles/colors";
import SvgUri from "react-native-svg-uri";
import PostItem from "../components/PostItem";
import {useSelector} from "react-redux";
import {useState} from "react";

export default function SearchScreen({navigation}) {
    const posts = useSelector((state) => state.posts.posts);
    const [searchInput, setSearchInput] = useState('');
    function handleInputChange(text) {
        setSearchInput(text)
    }

    return <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>
            Search
        </Text>
        <View style={{paddingHorizontal: 10}}>
            <SvgUri source={require('../assets/icons/search.svg')} width={30} height={30} style={styles.searchIcon}/>
            <Input
                style={styles.input}
                placeholder={'Search products...'}
                value={searchInput}
                onChangeText={(text) => handleInputChange(text)}
            />
        </View>
        <ScrollView style={{paddingHorizontal: 10, paddingTop: 10}}>
            {
                posts.map(post => {
                    let {title} = post;
                    const regexp = new RegExp(searchInput, 'i'); // regular expression of text input
                    if(regexp.test(title)) return <PostItem
                        id={ post.id }
                        name={post.title}
                        key={post.id}
                        navigation={navigation}
                    />
                    }
                )
            }
        </ScrollView>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryBg
    },
    input: {
        paddingLeft: 50
    },
    searchIcon: {
        position: 'absolute',
        top: '20%',
        left: 15
    },
    heading: {
        color: Colors.textBlack,
        fontWeight: "bold",
        fontSize: 22,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})