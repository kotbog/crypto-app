import {SafeAreaView, Image, Text, StyleSheet, ScrollView, View} from "react-native";
import {Colors} from "../styles/colors";
import Comment from "../components/Comment";
import Button from "../components/Button";
import {useQuery} from "@tanstack/react-query";
import {getPostDetails, getPosts} from "../services/PostsService";
import {useTranslation} from "react-i18next";
import useAuth from "../hooks/useAuth";

export default function PostProfileScreen({navigation, route}) {
    const {postId} = route.params;
    const auth = useAuth()
    const {t} = useTranslation()
    const { data, isLoading, isError } = useQuery({
        queryKey: [`postDetails-${postId}`],
        queryFn: () => getPostDetails({postId})
    });
    const postData = data;
    if(isLoading) return <SafeAreaView style={{flex:1, justifyContent:'center', alignItems: 'center'}}><Text>{`${t('COMMENTS')}...`}</Text></SafeAreaView>
    return <SafeAreaView style={styles.container}>
        <ScrollView style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.heading}>{postData.title}</Text>
                <Image source={require('../assets/post-img.png')}/>
            </View>
            <View style={{paddingHorizontal: 10}}>
            <Text style={styles.smHeading}>{t('ABOUT')}</Text>
            <View style={styles.about}>
                <Text
                    style={{fontSize: 15, color: Colors.textBlack,lineHeight: 32,}}
                >{postData.body}</Text>
                </View>
        </View>
        <View style={{gap: 10, marginTop: 10, paddingHorizontal: 10, paddingBottom: 20}}>
            <Text style={styles.smHeading}>{t('COMMENTS')}</Text>
            {
                postData.comments.map(comment => {
                    return <Comment
                        username={comment.name}
                        email={comment.email}
                        content={comment.body}
                        key={comment.id}
                    />

                })
            }
            </View>
        </ScrollView>
        <View style={{paddingHorizontal: 10, paddingVertical: 10,backgroundColor: Colors.white}}>
            <Button value={t('BACK')} onPress={() => navigation.goBack()}/>
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