import React, {useState, useEffect} from 'react';
import {Text, ScrollView, ActivityIndicator, FlatList, TouchableOpacity, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useRoute, useNavigation } from '@react-navigation/native';
import {DataStore, Auth} from 'aws-amplify';
import {Product, CartProduct} from '../../models';

import ProductItem from '../../components/ProductItem';
import styles from './style';
import QuantitySelector from '../../components/QuantitySelector';
import Button from '../../components/Button';
import ImageCarousel from '../../components/ImageCarousel';

const ProductScreen = () => {
  const [product, setProduct] = useState(null);

  const [selectedOption, setSelectedOption] = useState([]); 
  const [quantity, setQuantity] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (!route.params?.id) {
      return;
    }
    DataStore.query(Product, route.params.id).then(setProduct);
  }, [route.params?.id]);

  useEffect(() => {
    if (product?.options) {
      setSelectedOption(product.options[0]); 
    }
  }, [product]);

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData) {
      return;
    }

    const newCartProduct = new CartProduct({
      userSub: userData.attributes.sub,
      quantity,
      option: selectedOption,
      productID: product.id,
    });

    await DataStore.save(newCartProduct);
    navigation.navigate('Bookings');
  };

  if (!product) {
    return <Text>Can't find it</Text>;
  }

    return(
        <ScrollView style={styles.root}>
            <Text style={styles.title}>{product.title}</Text>
            {/* Image carousel */}
            <ImageCarousel images={product.images} />
            {/*option selector */}
            <Picker
            selectedValue={selectedOption}
            onValueChange={itemValue => setSelectedOption(itemValue)}>
            {product.options.map(option => (
            <Picker.Item key={option} label={option} value={option} />
            ))}
      </Picker>
            {/*price */}
            <Text style={styles.price}>
                from {product.price.toFixed(2)}/=
                {product.oldPrice && <Text style={styles.oldPrice}> {product.oldPrice.toFixed(2)}/=</Text>}
            </Text>
            {/*description */}
            <Text style={styles.description}>{product.description}</Text>
            <Text style={{}}>How many professionals do you need?</Text>
            <Text style={{}}>(pick according to the work difficulty)</Text>
            {/*qntty selector*/}
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            {/*button*/}
        <Button
            text={'Add To Cart'}
            onPress={onAddToCart}
            containerStyles={{borderWidth: 2, height: 50, width: 300, marginLeft: 50, marginBottom: 40, marginTop: 30, borderColor: '#527bb1'}}
        />
       </ScrollView>
    );
};

export default ProductScreen;