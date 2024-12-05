import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Spinner } from 'native-base';
import { Auth } from './auth';
import { LogOut } from './functions';

const CustomDrawer = ({ props, data }) => {
    const { changeIsLoggedIn } = Auth.useAuth()
    console.log(data);

    const DoLogOut = () => {
        console.log('Log');
        LogOut().then(() => { changeIsLoggedIn(false) })
    }
    return (
        <>
            <DrawerContentScrollView contentContainerStyle={{ height: '100%' }} {...props}>
                <ScrollView>
                    <Text style={{ color: '#FFFFFF', marginHorizontal: 20, marginTop: 20, marginBottom: 10, fontSize: 30 }}>Your Channels</Text>
                    {Boolean(data) ? <>{data.length === 0 ? <Text style={{ color: 'white', textAlign: 'center', fontWeight: '300' }}>You have not joined{'\n'} any channels yet</Text> : null}</> : <Spinner />}
                    <DrawerItemList {...props} />
                </ScrollView>

                <TouchableOpacity onPress={() => { DoLogOut() }} style={{ height: 50, marginTop: 'auto', alignItems: 'center', marginBottom: 25, borderRadius: 5, marginLeft: 10, marginRight: 10, flexDirection: 'row', backgroundColor: '#1b1b1b' }} >
                    <Ionicons color='#663399' style={{ alignSelf: 'center', marginLeft: 6 }} size={30} name="log-out-outline" />
                    <View><Text style={{ alignSelf: 'center', marginLeft: 10, color: 'white', fontWeight: 600 }}>Log Out</Text></View>
                </TouchableOpacity>
            </DrawerContentScrollView>
        </>
    )
}

export default CustomDrawer