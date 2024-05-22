import {SafeAreaView, Image, Text, StyleSheet, ScrollView, View} from "react-native";
import {Colors} from "../styles/colors";
import Comment from "../components/Comment";
import Button from "../components/Button";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchPostDetails} from "../store/slices/PostDetailsSlice";

export default function PostProfileScreen({navigation, route}) {
    const {postId} = route.params;
    const dispatch = useDispatch();
    const postData = useSelector((state) => state.postData.data);
    console.log(postData)
    useEffect(() => {
        dispatch(fetchPostDetails(postId))
    }, [dispatch]);
    return <SafeAreaView style={styles.container}>
        <ScrollView style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.heading}>{postData.title}</Text>
                <Image source={require('../assets/post-img.png')}/>
            </View>
            <View style={{paddingHorizontal: 10}}>
            <Text style={styles.smHeading}>About</Text>
            <View style={styles.about}>
                <Text
                    style={{fontSize: 15, color: Colors.textBlack,lineHeight: 32,}}
                >{postData.body}</Text>
                </View>
        </View>
        <View style={{gap: 10, marginTop: 10, paddingHorizontal: 10, paddingBottom: 20}}>
            <Text style={styles.smHeading}>Comments</Text>
            {
                postData.comments.map(comment => {
                    return <Comment
                        username={comment.name}
                        email={comment.email}
                        content={comment.body}/>

                })
            }
            </View>
        </ScrollView>
        <View style={{paddingHorizontal: 10, paddingVertical: 10,backgroundColor: Colors.white}}>
            <Button value={'Back'} onPress={() => navigation.goBack()}/>
        </View>
    </SafeAreaView>
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primaryBg,
        flex: 1
    },
    heading: {
        color: Colors.textBlack,
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 60,
        paddingBottom: 40,
    },
    header: {
        minHeight: 400,
        maxHeight: 600,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        backgroundColor: Colors.white,
        paddingVertical: 10,
        alignItems: 'center'
    },
    smHeading: {
        color: Colors.textGray,
        fontSize: 15,
        marginTop: 20
    },
    about: {
        marginTop: 10,
        borderRadius: 16,

        backgroundColor: Colors.white,

        padding: 15,

    }
})