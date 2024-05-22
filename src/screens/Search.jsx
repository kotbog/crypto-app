import {SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import Input from "../components/Input";
import {Colors} from "../styles/colors";
import SvgUri from "react-native-svg-uri";
import PostItem from "../components/PostItem";
import {useSelector} from "react-redux";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {getPosts} from "../services/PostsService";
import {useTranslation} from "react-i18next";

export default function SearchScreen({navigation}) {
    const { data:posts, isLoading, isError } = useQuery({
        queryKey: ['allPosts'],
        queryFn: () => getPosts(10)
    });
    const {t} = useTranslation();
    const [searchInput, setSearchInput] = useState('');
    function handleInputChange(text) {
        setSearchInput(text)
    }

    return <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>
            {t('SEARCH')}
        </Text>
        <View style={{paddingHorizontal: 10}}>
            <SvgUri source={require('../assets/icons/search.svg')} width={30} height={30} style={styles.searchIcon}/>
            <Input
                style={styles.input}
                placeholder={`${t('SEARCH_POSTS')}...`}
                value={searchInput}
                onChangeText={(text) => handleInputChange(text)}
            />
        </View>
        {isLoading ?
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text>{`${t('LOADING')}...`}</Text>
            </View>
            :
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
        }

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