import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import Router from './src/router';
import { Amplify } from 'aws-amplify';
import {withAuthenticator, AmplifyTheme } from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);

 function App() {
  return (
      <Router/>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

{/*const customTheme = { 
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: 'blue',
    borderRadius: 10,
  },
};*/}

export default withAuthenticator(App);
