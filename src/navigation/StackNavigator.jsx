import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/Home";
import PortfolioScreen from "../screens/Portfolio";
import SearchScreen from "../screens/Search";
import ProfileScreen from "../screens/Profile";
import TabIcons from "../components/TabIcons";
import WelcomeScreen from "../screens/Welcome";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "../screens/Login";
import SignupScreen from "../screens/Signup";
import TabNavigator from "./TabNavigator";
import PostProfileScreen from "../screens/PostProfile";
import EnterPinScreen from "../screens/EnterPin";
import ChangeLangScreen from "../screens/ChangeLang";
import {useDispatch, useSelector} from "react-redux";
import i18next from "i18next";
import {useEffect} from "react";
import {authUser} from "../store/slices/AuthSlice";
import useAuth from "../hooks/useAuth";

const Stack = createNativeStackNavigator();



export default function StackNavigator() {
    const currentLang = useSelector(state => state.profile.lang);

    useEffect(() => {
        i18next.changeLanguage(currentLang);
    }, [currentLang]);
    const {isAuthenticated} = useAuth();

    return (
        <Stack.Navigator
            initialRouteName={!isAuthenticated ? "Welcome" : "EnterPin"}
            screenOptions={{headerShown: false}}
        >

            {
                isAuthenticated ?
                    <Stack.Group>
                        <Stack.Screen name={'ChangeLangScreen'} component={ChangeLangScreen} />
                        <Stack.Screen name={'EnterPin'} component={EnterPinScreen} />
                        <Stack.Screen name={'Post'} component={PostProfileScreen} />
                        <Stack.Screen name={'HomeStack'} component={TabNavigator} />
                    </Stack.Group>
                    :
                    <Stack.Group>
                        <Stack.Screen name={'Welcome'} component={WelcomeScreen} />
                        <Stack.Screen name={'Signup'} component={SignupScreen} />
                        <Stack.Screen name={'Login'} component={LoginScreen} />
                    </Stack.Group>
            }


            {/*{*/}
            {/*    tabs.map(tab =><Stack.Screen*/}
            {/*            name={tab.name}*/}
            {/*            component={tab.component}*/}
            {/*            key={tab.name}*/}
            {/*        />*/}
            {/*    )*/}
            {/*}*/}
        </Stack.Navigator>
    );
}

