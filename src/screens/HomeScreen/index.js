import React, {useState, useEffect} from "react";
import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import ProductItem from "../../components/ProductItem";
import products from "../../data/products";
import { DataStore } from "aws-amplify";
import { Product } from "../../models";

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        DataStore.query(Product).then(setProducts);
      }, []);

 return (
    <>
    <View style={styles.page}>
        <FlatList
            data={products}
            renderItem={({item}) => <ProductItem item={item}/>}
            showsVerticalScrollIndicator={false}
        />
    </View>
    </>
 );
};

const styles = StyleSheet.create({
    page: {
        padding: 10,
    },
    header: {
        fontWeight: 'bold',
        color: '#5e5e5e',
        fontSize: 24,
        margin: 10,
    },
});


export default HomeScreen;