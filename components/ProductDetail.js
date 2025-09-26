import React,{ useState,useContext } from 'react';
import {View, Text,TextInput,Button,StyleSheet,Image} from 'react-native';
  import { CartContext } from '../store/CartProvider';

function ProductDetail({route}) {
    const { product } = route.params;
    const [quantity, setQuantity] = useState('1');
    const { addToCart } = useContext(CartContext);

    const onAddToCart = () => {
        const qty = parseInt(quantity);
        if(qty > 0){
            addToCart({...product, quantity: qty});
            alert('Added to cart');
        }
        else{
            alert('Enter a valid quantity');
        }
    }
  return (
   <View style={styles.container}>
    <Image source={{uri:product.imageUrl}}  style={styles.productImage} />
      <Text style={styles.name}>{product.title}</Text>
      <Text>Price: ${product.price}</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />
      <Button title="Add to Cart" onPress={onAddToCart} />
    </View>
  );
}
export default ProductDetail;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
 title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#192f6a',
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    color: '#444',
    marginBottom: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 20,
  },
  productImage: {
  width: '100%',
  height: 200,
  borderRadius: 15,
  marginBottom: 20,
  resizeMode: 'cover',
},

});