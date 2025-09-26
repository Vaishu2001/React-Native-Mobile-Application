import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, KeyboardAvoidingView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import axios from "axios";


export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const authenticate = async () => {
        try {
           const data = { email, password };

            const response = await axios.post("http://172.19.80.1:8080/auth/login", data);
            if (response?.status === 200 && response?.data?.status === true) {
                navigation.replace('Drawer');
            }
            else {
                alert(response.data.message || "Invalid credentials");
            }
        } catch (error) {
            alert('Network or server error, please try again later.');
        }
    }
    return (
        <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.gradient}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior="padding"
            >
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        value={password}
                        secureTextEntry
                        onChangeText={setPassword}
                    />
                    <Button style={styles.button} title="Login" onPress={authenticate} />
                </View>
            </KeyboardAvoidingView>
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 30,
    },
    form: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 10,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        padding: 12,
        marginBottom: 15,
        color: 'white',
        borderRadius: 10,
    },
    button: {
        borderRadius: 10,
        overflow: 'hidden',
    }
});