import React from "react";
import { createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import MenuScreen from "../screens/MenuScreen";
import ShoppingCartStack from './ShoppingCartStack';
import { color } from "react-native-reanimated";
import { Entypo, AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import HomeStack from './Homestack';


const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
    return (
        <Tab.Navigator 
        screenOptions = {({ route }) =>({
            tabBarActiveTintColor: '#527bb2',
            tabBarInactiveTintColor: '#a1a1a1',
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: [
              {
                display: "flex"
              },
              null
            ],
        tabBarIcon: ({ color }) => 
        screenOptions(route, color),
          
      })}
        >
                <Tab.Screen component={HomeStack} name="Home" 
                options={{
                    tabBarIcon: ({color}) => (
                        <Entypo name="home" size={25} color={color} />
                    ),
                }} />                
               {/* <Tab.Screen component={HomeScreen} name="Profile" 
                options={{
                    tabBarIcon: ({color}) => (
                        <FontAwesome name="user" size={25} color={color} />
                    ),
                }}
                />*/}
                <Tab.Screen component={ShoppingCartStack} name="Bookings" 
                options={{
                    tabBarIcon: ({color}) => (
                        <FontAwesome5 name="receipt" size={25} color={color} />
                    ),
                }}
                />
                <Tab.Screen component={MenuScreen} name="more" 
                options={{
                    tabBarIcon: ({color}) => (
                        <Entypo name="menu" size={25} color={color} /> 
                    ),
                }}
                />
        </Tab.Navigator>
    );
};

export default BottomTabNav;