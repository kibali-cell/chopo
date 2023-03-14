import { Image,View, Text, Pressable} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import {useNavigation } from '@react-navigation/native';
import styles from './styles';
import { Product } from '../../models';

interface ProductItemProps {
    item: {
        id: string;
        title: string;
        image: string;
        avgRating: number;
        ratings: number;
        price: number;
        oldPrice?: number;
    };
}


const ProductItem = ({item}: ProductItemProps) => {
    const navigation = useNavigation();

    const onPress = () => {
        navigation.navigate('ProductDetails', {id: item.id});
    }

    return (
        <Pressable onPress={onPress} style={styles.root}>
        <Image style={styles.image} source={{ uri:item.image}}/>
        <View style={styles.rightContainer}>
            <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
            
           {/* <View style={styles.ratingsContainer}>
            { [0,0,0,0,0].map((el, i) => 
            <FontAwesome 
                key={`${item.id}-${i}`}
                style={styles.star} 
                name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}
                size={18} 
                color={"#00adef"} 
            />
            )}*/}
            {/*<Text>{item.ratings}</Text>
            </View>*/}
            <Text style={styles.price}>
                from {item.price}/=
                {/*{item.oldPrice && <Text style={styles.oldPrice}> {item.oldPrice}/=</Text>}*/}
            </Text>
        </View> 
    </Pressable>
    );
};

export default ProductItem;