import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { useFavorites } from '../store/FavoritesProvider';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Favorite({ route }) {
  const { favorites } = useFavorites();
  const [favoriteproducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    getAllProductByIds();
  },[favorites])

  const getAllProductByIds = async () => {
    let favoriteIds = favorites?.map(favorite => favorite.productId);
    try {
      const data = {
        ids: favoriteIds
      }
      const response = await axios.post("http://172.19.80.1:8080/products/by-Ids", data);
      if (response?.status === 200 && response?.data?.status === true) {
        setFavoriteProducts(response.data.data);
      }
      else {
        alert(response.data.message || "No Products found");
      }
    } catch (error) {
      alert('Network or server error, please try again later.');
    }
  }


  const renderfavoriteproduct = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={{uri:item.imageUrl}} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.name}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </View>
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList data={favoriteproducts} renderItem={renderfavoriteproduct} keyExtractor={item => item.id} />
      </View>
    </>
  )
}
export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  productTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#192f6a',
  },
  productPrice: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
});