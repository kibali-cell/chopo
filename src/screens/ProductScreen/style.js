import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    root: {
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        color: '#5e5e5e',
        fontSize: 24,
        margin: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    oldPrice: {
        fontSize: 12,
        fontWeight: 'normal',
        textDecorationLine: 'line-through'
    },
    description: {
        marginVertical: 10,
        lineHeight: 20,
    },
});

export default styles;