import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";
import StackNavigator from "./src/navigation/StackNavigator";
import {Provider} from "react-redux";
import store from "./src/store/store";


export default function App() {
  return (
      <NavigationContainer>
        <Provider store={store}>
        <StackNavigator/>
          <StatusBar
              animated={true}
              barStyle={'dark-content'}
          />
        </Provider>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
