import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

interface ButtonProps {
  text: string;
  onPress: () => void;
  containerStyles?: object;
}

const Button = ({ text, onPress, containerStyles }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.root, containerStyles]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#527bb1',
    marginVertical: 10,
    height: 50,
    width: 200,
    marginLeft: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#527bb1',
  },
  text: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
})

export default Button;
