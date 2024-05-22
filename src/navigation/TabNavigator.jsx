import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/Home";
import PortfolioScreen from "../screens/Portfolio";
import SearchScreen from "../screens/Search";
import ProfileScreen from "../screens/Profile";
import TabIcons from "../components/TabIcons";
import SvgUri from "react-native-svg-uri";
import {Colors} from "../styles/colors";


const Tab = createBottomTabNavigator();



export default function TabNavigator() {

    const tabs = [
        {
            name: 'Home',
            component: HomeScreen,
            icon: require('../assets/icons/home.svg')
        },
        {
            name: 'Portfolio',
            component: PortfolioScreen,
            icon: require('../assets/icons/briefcase.svg')
        },
        {
            name: 'Search',
            component: SearchScreen,
            icon: require('../assets/icons/search-icon.svg')
        }
        ,        {
            name: 'Profile',
            component: ProfileScreen,
            icon: require('../assets/icons/profile-icon.svg')
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

