import {Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../styles/colors";
import RightArrowSvg from '../assets/icons/arrow-dropdown-right.svg'
import LinkSvg from '../assets/icons/link.svg'
import ArrowSvg from '../assets/icons/ArrowLeft.svg'

import SvgUri from "react-native-svg-uri";
import Post from "../components/Post";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchPosts} from "../store/slices/PostsSlice";

export default function HomeScreen({navigation}) {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts.posts);

    useEffect(() => {
        dispatch(fetchPosts())
    }, [dispatch]);
    console.log(posts)
    return <ScrollView style={{flex:1}}>
        <View style={styles.header}>
            <Text style={{fontSize: 13, color: Colors.white}}>Your name</Text>
            <Text style={{fontSize: 28, color: Colors.white, fontWeight: 'bold'}}>John Doe</Text>
        </View>
        <View style={{paddingHorizontal: 10, paddingTop: 20}}>
            <View style={styles.banner}>
                <View style={{flex: 2}}>
                    <Text style={{color: Colors.textBlack, fontSize: 15}}>Test task</Text>
                    <Text style={{color: Colors.textGray, fontSize: 12}}>Lorem ipsum</Text>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20}}>
                        <Text style={{color: Colors.primaryOrange, fontSize: 15}}>Go to Call</Text>
                        <SvgUri source={RightArrowSvg} width={18} height={18}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.block}>
                    <View>
                    </View>
                </View>
            </View>
            <Text style={styles.headerText}>Before you start</Text>
            <ScrollView style={styles.additions} horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.additionItem}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <SvgUri source={LinkSvg} width={24} height={24} style={styles.linkIcon}/>
                        <Text style={{color: Colors.white, fontSize: 15, maxWidth: '70%'}}>Link your Bank Account</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{color: Colors.white, fontSize: 15}}>2 Steps</Text>
                        <SvgUri source={ArrowSvg} width={30} height={30}/>
                    </View>
                </View>

                <View style={styles.additionItem}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <SvgUri source={LinkSvg} width={24} height={24} style={styles.linkIcon}/>
                        <Text style={{color: Colors.white, fontSize: 15, maxWidth: '70%'}}>Link your Bank Account</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{color: Colors.white, fontSize: 15}}>2 Steps</Text>
                        <SvgUri source={ArrowSvg} width={30} height={30}/>
                    </View>
                </View>
            </ScrollView>
            <View>
                <Text style={styles.headerText}>Posts</Text>
                <View style={{gap: 10, marginTop: 10, paddingHorizontal: 5, marginBottom: 10}}>

                    {
                        posts.map(post =>
                            <Post
                                navigation={navigation}
                                heading={post.title}
                                content={post.body}
                                id={post.id}
                                key={post.id}
                            />
                        )
                    }

                    {/*<Post*/}
                    {/*    navigation={navigation}*/}
                    {/*    heading={'How to take shower?'}*/}
                    {/*    content={"The weather outside is lovely today, isn't it? I can't wait to take a stroll through the park."}/>*/}
                    {/*<Post*/}
                    {/*    navigation={navigation}*/}
                    {/*    heading={'How to take shower?'}*/}
                    {/*    content={"The weather outside is lovely today, isn't it? I can't wait to take a stroll through the park."}/>*/}
                    {/*<Post*/}
                    {/*    navigation={navigation}*/}
                    {/*    heading={'How to take shower?'}*/}
                    {/*    content={"The weather outside is lovely today, isn't it? I can't wait to take a stroll through the park."}/>*/}
                </View>
            </View>
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.primaryOrange,
        height: 250,
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius: 28,
        borderBottomLeftRadius: 28,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)'
    },
    banner: {
        backgroundColor: Colors.white,
        borderRadius: 16,
        padding: 20,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    block: {
        width: 120, height: 120,
        backgroundColor: '#1988A5',
        borderRadius: 13,
    },
    additions: {
       marginTop:10
    },
    additionItem: {
        backgroundColor: '#636363',
        borderRadius: 16,
        padding: 15,
        gap: 20,
        marginRight: 10
    },
    linkIcon: {
        backgroundColor: Colors.primaryOrange,
        padding: 10,
        borderRadius: "100%"
    },
    headerText: {
        fontSize: 15,
        color: Colors.textGray,
        marginTop: 25
    }
})



