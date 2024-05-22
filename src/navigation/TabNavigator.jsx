import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/Home";
import PortfolioScreen from "../screens/Portfolio";
import SearchScreen from "../screens/Search";
import ProfileScreen from "../screens/Profile";
import TabIcons from "../components/TabIcons";
import SvgUri from "react-native-svg-uri";
import {Colors} from "../styles/colors";
import {useTranslation} from "react-i18next";


const Tab = createBottomTabNavigator();



export default function TabNavigator() {
    const {t} = useTranslation()
    const tabs = [
        {
            name: 'Home',
            component: HomeScreen,
            icon: require('../assets/icons/home.svg'),
            label: t('HOME')
        },
        {
            name: 'Portfolio',
            component: PortfolioScreen,
            icon: require('../assets/icons/briefcase.svg'),
            label: t('PORTFOLIO')
        },
        {
            name: 'Search',
            component: SearchScreen,
            icon: require('../assets/icons/search-icon.svg'),
            label: t('SEARCH')
        }
        ,        {
            name: 'Profile',
            component: ProfileScreen,
            icon: require('../assets/icons/profile-icon.svg'),
            label: t('PROFILE')
        },
    ]

    return (
        <Tab.Navigator
            initialRouteName={'Home'}
            screenOptions={{
                tabBarActiveTintColor: Colors.primaryOrange
            }}
        >
            {
                tabs.map(tab =>
                    <Tab.Screen

                        name={tab.name}
                        component={tab.component}
                        options={{
                            headerShown: false,
                            tabBarLabel: tab.label,
                            tabBarIcon: ({size,focused,color}) => {
                                return (
                                    <SvgUri
                                        style={{ width: size, height: size, stroke: color }}
                                        source={tab.icon}
                                    />
                                )}
                    }}
                        key={tab.name}
                    />
                )
            }
        </Tab.Navigator>
    );
}

