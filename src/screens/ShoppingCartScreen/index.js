import React, {useState, useEffect} from "react";
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from "react-native";
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models';

import { FontAwesome } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
import CartProductItem from "../../components/CartProductItem";
import Button from "../../components/Button";


const ShoppingCartScreen = () => {
  const [cartProducts, setCartProducts] = useState([]);

  const navigation = useNavigation();

    const fetchCartProducts = async () => {
        const userData = await Auth.currentAuthenticatedUser();
        // TODO query only my cart items
        DataStore.query(CartProduct, cp =>
          cp.userSub.eq(userData.attributes.sub),
        ).then(setCartProducts);
      };
    
      useEffect(() => {
        fetchCartProducts();
      }, []);
    
      useEffect(() => {
        if (cartProducts.filter(cp => !cp.product).length === 0) {
          return;
        }
    
        const fetchProducts = async () => {
          // query all products that are used in cart
          const products = await Promise.all(
            cartProducts.map(cartProduct =>
              DataStore.query(Product, cartProduct.productID),
            ),
          );
    
          // assign the products to the cart items
          setCartProducts(currentCartProducts =>
            currentCartProducts.map(cartProduct => ({
              ...cartProduct,
              product: products.find(p => p.id === cartProduct.productID),
            })),
          );
        };
    
        fetchProducts();
      }, [cartProducts]);
    
      useEffect(() => {
        const subscription = DataStore.observe(CartProduct).subscribe(msg =>
          fetchCartProducts(),
        );
        return subscription.unsubscribe;
      }, []);
    
      useEffect(() => {
        const subscriptions = cartProducts.map(cp =>
          DataStore.observe(CartProduct, cp.id).subscribe(msg => {
            if (msg.opType === 'UPDATE') {
              setCartProducts(curCartProducts =>
                curCartProducts.map(cp => {
                  if (cp.id !== msg.element.id) {
                    console.log('different id');
                    return cp;
                  }
                  return {
                    ...cp,
                    ...msg.element,
                  };
                }),
              );
            }
          }),
        );
    
        return () => {
          subscriptions.forEach(sub => sub.unsubscribe());
        };
      }, [cartProducts]);
    
      const totalPrice = cartProducts.reduce(
        (summedPrice, product) =>
          summedPrice + (product?.product?.price || 0) * product.quantity,
        0,
      );
    
      const onCheckout = () => {
        navigation.navigate('Address', {totalPrice});
      };
    
      if (cartProducts.filter(cp => !cp.product).length !== 0) {
        return <ActivityIndicator />;
      }

    return(
        <View style={styles.page}>
            {/* Render product component */}

            <FlatList 
                data={cartProducts}
                renderItem={({item}) => 
                <CartProductItem cartItem={item} />}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => (

            <View>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Subtotal ({cartProducts.length} items): {' '} 
                
                <Text style={{color: '#527bb1', fontWeight: 'bold'}}>{totalPrice.toFixed(2)} /= </Text>
                </Text>

                <Button 
                text="Proceed to checkout" 
                onPress={onCheckout}
                containerStyles={{
                    backgroundColor: '#527bb1', 
                    borderColor:'#527bb1',
                    }}
                />
                
            </View>

                )}
            />
        </View>    
       );
};

const styles = StyleSheet.create ({
    page: {
        padding: 10,
    },
});

export default ShoppingCartScreen;