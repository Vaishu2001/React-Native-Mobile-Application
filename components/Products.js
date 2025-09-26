import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useFavorites } from "../store/FavoritesProvider.js";
import axios from "axios";
import Icon from 'react-native-vector-icons/FontAwesome';



export default function Products({ navigation }) {
  const { favorites, toggleFavorite } = useFavorites();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);



  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://172.19.80.1:8080/products/all-products");
      if (response?.status === 200 && response?.data?.status === true) {
        setProducts(response.data.data);
      }
      else {
        alert(response.data.message || "No Products found");
      }
    } catch (error) {
      alert('Network or server error, please try again later.');
    }
  }

  const renderProducts = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        {/* <Icon name="home" size={30} color="#900" /> */}
        <View style={styles.buttonsRow}>
          <Button title="Details" onPress={() => navigation.navigate('Details', { product: item })} />

          <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
            <Icon
              name={favorites?.some(fav => fav?.productId === item.id) ? 'heart' : 'heart-o'}
              size={24}
              color={favorites?.some(fav => fav?.productId === item.id) ? 'red' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );



  return (
    <View>
      <FlatList data={products} renderItem={renderProducts} keyExtractor={item => item.id} extraData={favorites} />
    </View>
  )
}

const styles = StyleSheet.create({
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  productInfo: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#192f6a',
  },
  productPrice: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  productImage: {
    width: 120,
    height: 120,
  },
  buttonsRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 10,
  },

  btn: {
    width: 200, margin: 10
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end', marginVertical: 10,
    gap: 10,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#3b5998', padding: 10, borderRadius: 5
  },
  buttonText: { color: 'white', fontWeight: 'bold' },


})