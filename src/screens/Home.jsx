import {Image, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Colors} from "../styles/colors";
import RightArrowSvg from '../assets/icons/arrow-dropdown-right.svg'
import LinkSvg from '../assets/icons/link.svg'
import ArrowSvg from '../assets/icons/ArrowLeft.svg'
import Post from "../components/Post";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "@tanstack/react-query";
import {getPosts} from "../services/PostsService";
import {useTranslation} from "react-i18next";
import useAuth from "../hooks/useAuth";

export default function HomeScreen({navigation}) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(3)
    });
    const {t} = useTranslation()

    const user = useSelector((state) => state.auth.user)
    console.log(user)
    const posts = data;
    if(isLoading ) return <SafeAreaView><Text>{`${t('LOADING')}...`}</Text></SafeAreaView>
    return <ScrollView style={{flex:1}}>
        <View style={styles.header}>
            <Text style={{fontSize: 13, color: Colors.white}}>{t("YOUR_NAME")}</Text>
            <Text style={{fontSize: 28, color: Colors.white, fontWeight: 'bold'}}>{`${user.firstName} ${user.lastName}`}</Text>
        </View>
        <View style={{paddingHorizontal: 10, paddingTop: 20}}>
            <View style={styles.banner}>
                <View style={{flex: 2}}>
                    <Text style={{color: Colors.textBlack, fontSize: 15}}>Test task</Text>
                    <Text style={{color: Colors.textGray, fontSize: 12}}>Lorem ipsum</Text>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 20}}>
                        <Text style={{color: Colors.primaryOrange, fontSize: 15}}>Go to Call</Text>
                        <RightArrowSvg width={18} height={18}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.block}>
                    <View>
                    </View>
                </View>
            </View>
            <Text style={styles.headerText}>{t("BEFORE_START")}</Text>
            <ScrollView style={styles.additions} horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.additionItem}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <View style={styles.linkIcon}>
                            <LinkSvg width={24} height={24} />
                        </View>
                        <Text style={{color: Colors.white, fontSize: 15, maxWidth: '70%'}}>Link your Bank Account</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{color: Colors.white, fontSize: 15}}>{`2 ${t("STEPS")}`}</Text>
                        <ArrowSvg width={30} height={30}/>
                    </View>
                </View>

                <View style={styles.additionItem}>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <View style={styles.linkIcon}>
                            <LinkSvg width={24} height={24} />
                        </View>
                        <Text style={{color: Colors.white, fontSize: 15, maxWidth: '70%'}}>Link your Bank Account</Text>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Text style={{color: Colors.white, fontSize: 15}}>{`2 ${t("STEPS")}`}</Text>
                        <ArrowSvg width={30} height={30}/>
                    </View>
                </View>
            </ScrollView>
            <View>
                <Text style={styles.headerText}>{t("POSTS")}</Text>
                <View style={{gap: 10, marginTop: 10, paddingHorizontal: 5, marginBottom: 10}}>
                    {
                        posts?.map(post =>
                            <Post
                                navigation={navigation}
                                heading={post.title}
                                content={post.body}
                                id={post.id}
                                key={post.id}
                            />
                        )
                    }
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



