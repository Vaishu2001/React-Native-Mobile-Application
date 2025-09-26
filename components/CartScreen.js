import { View, Text, StyleSheet, FlatList, Button, Alert, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useCart } from '../store/CartProvider';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';

function CartScreen({navigation}) {
  const { removeFromCart, cartItems, clearCart } = useCart();
  const [cartData, setCartData] = useState([]);
  const isFocused = useIsFocused();


  useEffect(() => {

    getAllProductByIds();

  }, [cartItems]);


  const getAllProductByIds = async () => {
    let cartIds = cartItems?.map(item => item.productId);
    try {
      const data = {
        ids: cartIds
      }
      const response = await axios.post("http://172.19.80.1:8080/products/by-Ids", data);
      if (response?.status === 200 && response?.data?.status === true) {
        const products = response.data.data;
        const mergedData = products.map(product => {
          const cartItem = cartItems.find(item => item.productId === product.id);
          return {
            ...product,
            quantity: cartItem?.quantity || 1
          };
        });

        console.log(mergedData)
        setCartData(mergedData);
      }
      else {
        alert(response.data.message || "No Products found");
      }
    } catch (error) {
      alert('Network or server error, please try again later.');
    }
  }
  const placeOrder = () =>{
    navigation.navigate('Order Summary',{ cartData: cartData });
  }
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <Text style={styles.itemText}>{item.name} - ${item.price} * {item.quantity}</Text>
      <Button title="Remove" onPress={() =>
        Alert.alert(
          'Remove Item',
          'Are you sure you want to remove this item from the cart?',
          [
            { text: 'Cancel' },
            { text: 'Remove', onPress: () => removeFromCart(item.id) },
          ]
        )
      } />
    </View>
  )

  const totalAmount = cartData?.length > 0 && cartData.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <View>
          <FlatList data={cartData} renderItem={renderItem} keyExtractor={item => item.id} contentContainerStyle={styles.list} />
          <Text style={styles.total}>Total: ${totalAmount && totalAmount?.toFixed(2)}</Text>
          <View style={styles.buttonRow}>
            <Button title="Clear Cart" color="#192f6a"
              onPress={() =>
                Alert.alert(
                  'Clear Cart',
                  'Are you sure you want to clear the cart?',
                  [
                    { text: 'Cancel' },
                    { text: 'Clear', onPress: () => clearCart() },
                  ]
                )
              } />
            
            <Button
              title="Place Order"
              color="#28a745"
              onPress={() => placeOrder() }
              
            />

          </View>
        </View>
      )}
    </View>
  );
}
export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  list: {
    paddingBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 30,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 15,

  },
  itemText: {
    fontSize: 16,
    color: '#192f6a'
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  total: {
    fontSize: 18, fontWeight: 'bold', marginVertical: 10, marginRight: 5
  },
  buttonRow:{
    flexDirection: 'row',
    justifyContent:'space-between',
    marginVertical:10
  }
});