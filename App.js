import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import StackNavigator from "./src/navigation/StackNavigator";
import {Provider} from "react-redux";
import {persistorRedux, store} from "./src/store/store";
import {QueryClient} from "@tanstack/react-query";
import {createAsyncStoragePersister} from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {PersistQueryClientProvider} from "@tanstack/react-query-persist-client";
import {PersistGate} from "redux-persist/integration/react";
import './src/locales/i18n'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            cacheTime: 1000 * 60 * 60 * 24 * 8, // 8 days
        },
    },
})

const asyncStoragePersister = createAsyncStoragePersister({
    storage: AsyncStorage,
})


export default function App() {
  return (
      <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: asyncStoragePersister }}
      >
          <PersistGate loading={null} persistor={persistorRedux}>
              <NavigationContainer>
                <Provider store={store}>
                <StackNavigator/>
                  <StatusBar
                      animated={true}
                      barStyle={'dark-content'}
                  />
                </Provider>
              </NavigationContainer>
          </PersistGate>
      </PersistQueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
