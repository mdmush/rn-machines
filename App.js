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
import ManageCategories from './src/screens/manageCategories';
import {useDispatch, useSelector} from 'react-redux';
import Category from './src/screens/category';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {MenuProvider} from 'react-native-popup-menu';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function Main() {
  const {machines} = useSelector(state => state.machines);
  return (
    <Drawer.Navigator
      useLegacyImplementation
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="dashboard"
        component={Dashboard}
        options={{headerShown: false, drawerType: 'slide'}}
      />
      <Drawer.Screen
        name={'category'}
        component={Category}
        options={{headerShown: false, drawerType: 'slide'}}
      />
      <Drawer.Screen
        name="managecategories"
        component={ManageCategories}
        options={{headerShown: false, drawerType: 'slide'}}
      />
    </Drawer.Navigator>
  );
}

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#cb2030',
    secondary: '#000',
  },
};

export default function App() {
  let persistor = persistStore(store);
  return (
    <SafeAreaView style={{flex: 1}}>
      <TailwindProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider theme={theme}>
              <MenuProvider>
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
              </MenuProvider>
            </PaperProvider>
          </PersistGate>
        </Provider>
      </TailwindProvider>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
    </SafeAreaView>
  );
}
