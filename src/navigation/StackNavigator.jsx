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
import {useSelector} from "react-redux";

const Stack = createNativeStackNavigator();



export default function StackNavigator() {
    const tabs = [
        {
            name: 'Welcome',
            component: WelcomeScreen
        },
        {
            name: 'Login',
            component: LoginScreen
        },
        {
            name: 'HomeStack',
            component: TabNavigator
        },
        {
            name: 'Signup',
            component: SignupScreen
        },
        {
            name: 'Post',
            component: PostProfileScreen
        },
        {
            name: 'EnterPin',
            component: EnterPinScreen
        },
        {
            name: 'ChangeLangScreen',
            component: ChangeLangScreen
        }
    ]

    return (
        <Stack.Navigator
            initialRouteName={'Welcome'}
            screenOptions={{headerShown: false}}
        >
            {
                tabs.map(tab =><Stack.Screen
                        name={tab.name}
                        component={tab.component}
                        key={tab.name}
                    />
                )
            }
        </Stack.Navigator>
    );
}

