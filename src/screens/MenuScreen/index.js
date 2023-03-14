import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import Button from "../../components/Button";
import { Auth } from "aws-amplify";

const MenuScreen = () => {

    return(
        <SafeAreaView style={{marginTop: 50, width: 200, marginLeft: 10}}>
            <Button onPress={() => Auth.signOut()} text="Sign Out"/>
        </SafeAreaView>
    );
};

export default MenuScreen;