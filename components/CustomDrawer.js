import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
function CustomDrawer(props) {
    const { navigation } = props;

    const handleLogout = () => {
        navigation.replace('Login');
    }

    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#f9f9f9' }}>
                <View style={styles.header}>
                    <Image
                        source={require('../assets/images/user.png')}
                        style={styles.userIcon}
                    />
                    <Text style={styles.username}>Vaishnavi</Text>
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <View style={styles.footer}>
                <Button title="Logout" onPress={handleLogout} />
            </View>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        paddingVertical: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e3f2fd',
        marginBottom:10
    },
    username:{
        fontSize:12,
        fontWeight:600,
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc'
    },
    userIcon: {
        width: 80,
        height: 80,
        marginBottom: 10,
    }

})
export default CustomDrawer;