import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/Home";
import PortfolioScreen from "../screens/Portfolio";
import SearchScreen from "../screens/Search";
import ProfileScreen from "../screens/Profile";
import {Colors} from "../styles/colors";
import {useTranslation} from "react-i18next";
import HomeSvg from '../assets/icons/home.svg'
import PortfolioSvg from '../assets/icons/briefcase.svg'
import SearchSvg from '../assets/icons/search-icon.svg'
import ProfileSvg from '../assets/icons/profile-icon.svg'

const Tab = createBottomTabNavigator();
export default function TabNavigator() {
    const {t} = useTranslation()
    const tabs = [
        {
            name: 'Home',
            component: HomeScreen,
            icon: HomeSvg,
            label: t('HOME')
        },
        {
            name: 'Portfolio',
            component: PortfolioScreen,
            icon: PortfolioSvg,
            label: t('PORTFOLIO')
        },
        {
            name: 'Search',
            component: SearchScreen,
            icon: SearchSvg,
            label: t('SEARCH')
        }
        ,        {
            name: 'Profile',
            component: ProfileScreen,
            icon: ProfileSvg,
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
                                    <tab.icon
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

