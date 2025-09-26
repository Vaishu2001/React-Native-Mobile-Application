/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Products from './components/Products';
import { CartProvider } from './store/CartProvider';
import ProductDetail from './components/ProductDetail';
import Favorite from './components/Favorite';
import CartScreen from './components/CartScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoritesProvider } from './store/FavoritesProvider';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './components/CustomDrawer';
import OrderSummary from './components/OrderSummary';
import AddressForm from './components/AddressForm';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName='SmartCart'
    >
      <Drawer.Screen name="SmartCart" component={ProductTabs} options={{ headerShown: true }} />

    </Drawer.Navigator>
  )
}


function ProductTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="SmartCart" component={Products} options={{ headerShown: false }} />
      <Tab.Screen name="Favorites" component={Favorite} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  )
}



function AppContent() {

  return (
    <CartProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Details" component={ProductDetail} />
            <Stack.Screen name="Order Summary" component={OrderSummary} />
            <Stack.Screen name="AddressForm" component={AddressForm} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </CartProvider>
  );
}


export default App;
