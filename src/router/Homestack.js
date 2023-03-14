import React, {useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ProductScreen from '../screens/ProductScreen';
import { StatusBar, View, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';



const Stack = createStackNavigator();

interface HeaderComponentProps {
    searchValue: string;
    setSearchValue: () => void;
}

const HeaderComponent = ({searchValue, setSearchValue} : HeaderComponentProps) => {
    return(
        <SafeAreaView style={{backgroundColor: 'white', borderBottomRightRadius: 30, borderBottomLeftRadius: 30}}> 
        <View style={{ margin: 10, flexDirection: 'row',borderRadius: 20, alignItems: 'center', padding: 10}}>
            <Text style={{fontWeight: 'bold',color: '#527bb1',fontSize: 45}}>chopo.</Text>
       {/* <Feather name="search" size={30} color="grey"/>
           <TextInput 
    style={{height: 40, width: 320 ,fontSize: 20,  backgroundColor: '#ececec', marginLeft: 10, }} placeholder="Search..." value={searchValue} onChangeText={setSearchValue}/>*/}
        </View>
        </SafeAreaView>
        
  
    );
};

const HomeStack = () => {
    const [searchValue, setSearchValue] = useState('');
    return (
            <Stack.Navigator 
            screenOptions={{
            header: () => (
            <HeaderComponent 
            searchValue={searchValue} 
            setSearchValue={setSearchValue}
            />
            ),
        }}>

            <Stack.Screen 
            name="HomeScreen" 
            options={{title: 'Home'}}>
                {() => <HomeScreen searchValue={searchValue} />}
            </Stack.Screen>

            <Stack.Screen component={ProductScreen} name="ProductDetails" />
        </Stack.Navigator>
        
    );
};

export default HomeStack;