import {SafeAreaView, StatusBar} from 'react-native';
import {TailwindProvider} from 'tailwindcss-react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splashscreen from './src/screens/splashscreen';
import Dashboard from './src/screens/dashboard';
import {createDrawerNavigator} from '@react-navigation/drawer';
import store from './src/state/store';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {Provider} from 'react-redux';
import CustomDrawerContent from './src/components/drawerContent';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Main() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="dashboard"
        component={Dashboard}
        options={{headerShown: false, drawerType: 'slide'}}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  let persistor = persistStore(store);
  return (
    <SafeAreaView style={{flex: 1}}>
      <TailwindProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="splashscreen">
                <Stack.Screen
                  name="splashscreen"
                  component={Splashscreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name="main"
                  component={Main}
                  options={{headerShown: false}}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </TailwindProvider>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </SafeAreaView>
  );
}
