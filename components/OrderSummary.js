import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Alert, Button, FlatList } from "react-native";
import axios from "axios";
import { useCart } from "../store/CartProvider";

const OrderSummary = ({ navigation,route }) => {
    const {cartData} = route.params;
    const { cartItems, clearCart } = useCart();
    const [address, setAddress] = useState(null);

    useEffect(() => {
        console.log("cartData", cartData)
        fetchAddress();
    }, [])

    const fetchAddress = async () => {
        try {
            const response = await axios.get('http://172.19.80.1:8080/address/all?userId=68d2ba1a9dbfcafe07c8dff7');
            if (response.data.status) {
                console.log(response.data.data)
                setAddress(response.data.data[0]);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to fetch address');
        }

    }
    const handlePayment = () => {

    }
    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text>{item.name} x {item.quantity}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Shipping Address</Text>
                {
                    address ? (
                        <View>
                            <Text>{address.line1}, {address.city}, {address.zip}</Text>
                            <Button title="Change address" onPress={() => navigation.navigate("AddressForm")} />
                        </View>
                    ) :
                        <Button title="Add Address" onPress={() => navigation.navigate('AddressForm')} />


                }
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>
                    <FlatList
                        data={cartData}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />

                </Text>
            </View>
            <Button
                title={'Proceed to Payment'}
                color="#28a745"
                onPress={handlePayment} />

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    section: {
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10
    },
    item: {
        paddingVertical: 5
    }

})
export default OrderSummary;