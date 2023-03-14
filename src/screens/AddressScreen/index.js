import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import Button from "../../components/Button";
import styles from "./style";
import {Order, OrderProduct, CartProduct} from '../../models';
import { useNavigation, useRoute } from "@react-navigation/native";
import {Auth, DataStore, API, graphqlOperation} from 'aws-amplify';


const AddressScreen = () => {
    const [selectedValue, setSelectedValue] = useState("kili");
    const [fullname, setFullname] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');

    const navigation = useNavigation();
  const route = useRoute();
  const amount = Math.floor(route.params?.totalPrice * 100 || 0);


    const saveOrder = async () => {
        // get user details
        const userData = await Auth.currentAuthenticatedUser();
        // create a new order
        const newOrder = await DataStore.save(
          new Order({
            userSub: userData.attributes.sub,
            fullName: fullname,
            phoneNumber: phone,
            city,
            address,
          }),
        );
    
        // fetch all cart items
        const cartItems = await DataStore.query(CartProduct, cp =>
          cp.userSub.eq(userData.attributes.sub),
        );
    
        // attach all cart items to the order
        await Promise.all(
          cartItems.map(cartItem =>
            DataStore.save(
              new OrderProduct({
                quantity: cartItem.quantity,
                option: cartItem.option,
                productID: cartItem.productID,
                orderID: newOrder.id,
              }),
            ),
          ),
        );
    
        // delete all cart items
        await Promise.all(cartItems.map(cartItem => DataStore.delete(cartItem)));
    
        // redirect home
        navigation.navigate('HomeScreen');
      };

    const onCheckOut = () => {
        if (!fullname) {
            Alert.alert('Please fill in the fullname field')
            return;
        }
        if (!phone) {
            Alert.alert('Please fill the phone number')
            return;
        }
        console.warn('Success checkout');
        saveOrder();
    }

    return (
        <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}>
        <ScrollView style={styles.root}>
            <View style={styles.row}>
           <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 200 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
            <Picker.Item label="Kilimanjaro" value="kili" />
            <Picker.Item label="Arusha" value="aru" />
            <Picker.Item label="Dar" value="dar" />
            <Picker.Item label="Mwanza" value="mwa" />
            </Picker>
            </View>

            
            <View style= {styles.row}>
                <Text style={styles.label}>Full Name (First and Last name)</Text>
                <TextInput 
                style={styles.input} 
                placeholder='Full Name' 
                value={fullname} 
                onChangeText={setFullname}
                />
            </View>
            <View style= {styles.row}>
                <Text style={styles.label}>Phone Number</Text>
                <TextInput keyboardType="phone-pad" 
                style={styles.input} 
                placeholder='+255 123456789' 
                value={phone} 
                onChangeText={setPhone}
                />
            </View>
            <View style= {styles.row}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                style={styles.input} 
                placeholder='P. O. Box 1234 Moshi Tanzania' 
                value={address} 
                onChangeText={setAddress}
                />
            </View>
            <View style= {styles.row}>
                <Text style={styles.label}>Instructions</Text>
                <TextInput
                style={styles.input} 
                placeholder='Ward, road or popular landmark like hospital or school.' 
                value={city} 
                onChangeText={setCity}
                />
            </View>

            <Button text="CHECK OUT" onPress={onCheckOut}/>
        </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddressScreen;