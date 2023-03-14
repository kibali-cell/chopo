import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    root: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 10,  
        marginVertical: 5,
        margin: 8,
    },
    image: {
        flex: 2,
        height: 150,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
    },
    rightContainer: {
      padding: 10,  
      flex: 3,
    },
    title: {
        fontSize: 20,
        color: '#527bb1',
        fontWeight: 'bold',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 30,
        color: '#5e5e5e',
    },
    oldPrice: {
        fontSize: 12,
        fontWeight: 'normal',
        textDecorationLine: 'line-through'
    },
    ratingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    star: {
        margin: 2,
    },
});

export default styles;