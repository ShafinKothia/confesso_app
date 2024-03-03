
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";

import AddConfession from "./add-confession";
import ConnectToWallet from "./connect-wallet"
import AddName from "./add-user";
import AddChannel from "./add-channel";
import JoinChannel from "./join-channel";
import Splash from "./splash";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { View, Text, Button, useWindowDimensions } from "react-native";
import React, { useState, useEffect } from "react";
import CustomDrawer from "./custom-drawer";
import ApproveConfessions from "./approve-confessions";
import WelcomeScreen1 from "./welcomescreen1";
import WelcomeScreen2 from "./welcomescreen2";
import WelcomeScreen3 from "./welcomescreen3";
import axios from 'axios';
import { CheckIsLoggedIn, GetChannels } from './functions';
import Login from './login';
import { Auth } from './auth';
import Register from './register';
import { Spinner } from 'native-base';
import Moderator from './moderator';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator()


const Header = ({ navigation, props }) => {
    const { height, width } = useWindowDimensions();


    return (
        <View style={{ flexDirection: 'row', height: 70, paddingTop: 10, backgroundColor: '#121212' }}>
            <View style={{ elevation: 9, width: '50px', height: '50px', justifyContent: 'center' }}><Ionicons onPress={() => { navigation.toggleDrawer(); }} name="menu" size={40} style={{ marginLeft: 10, color: '#663399' }} /></View>
            <View style={{ flexDirection: 'row', width: width - 50 }}>
                <View style={{ width: 'full', paddingLeft: 10, justifyContent: 'center' }}>
                    {props.route.name === "JoinChannel" ? <Text style={{ fontSize: 20, color: '#FFFFFF' }}>Join Channel</Text> : <Text style={{ fontSize: 20, color: '#FFFFFF' }}>{props.route.name}</Text>}

                </View>
            </View>
        </View>
    )
}

const AllComponents = ({ data, refetch }) => {

    return <Drawer.Navigator initialRouteName="Home" drawerContent={props => <CustomDrawer props={props} data={data} />} screenOptions={({ navigation }) => ({ header: (props) => <Header navigation={navigation} props={props} />,drawerContentContainerStyle: {height: '100%'}, drawerLabelStyle: { marginLeft: -25 }, drawerStyle: { backgroundColor: '#121212' }, drawerInactiveTintColor: '#FFFFFF', drawerInactiveBackgroundColor: '#1b1b1b' })}>
        {

            data?.map((e, i) => (
                <>
                    <Drawer.Screen name={e.name} options={{ drawerIcon: () => (<AntDesign color='#663399' size={20} name="right" />), drawerActiveTintColor: '#663399', drawerInactiveTintColor: '#FFFFFF' }} component={AddConfession} initialParams={{ id: e.id, images_allowed: e.images_allowed }} />
                </>
            ))
        }
        <Drawer.Screen name="Home" component={ConnectToWallet} options={{
            drawerLabel: () => null,
            title: null,
            drawerItemStyle: { height: 0 },
            drawerIcon: () => null
        }} />

        <Drawer.Screen name="AddConfession" component={AddConfession} options={{
            drawerLabel: () => null,
            title: null,
            drawerItemStyle: { height: 0 },
            drawerIcon: () => null
        }} />

        <Drawer.Screen name="JoinChannel"  component={JoinChannel} options={{ drawerLabelStyle: { marginLeft: -25 }, drawerIcon: () => (<Ionicons color='#663399' size={25} name="arrow-forward-outline" />), title: 'Join Channel', drawerActiveTintColor: '#663399', drawerInactiveTintColor: '#FFFFFF' }} initialParams={{ data: data, refetch: refetch }} />


        <Drawer.Screen name="AddChannel" component={AddChannel} options={{
                            unmountOnBlur: true,

            drawerLabel: "Create Channel",
            title: null,
            drawerLabelStyle: { marginLeft: -25 },
            // drawerItemStyle: { height: 0 },
            drawerIcon: () => (<Ionicons color='#663399' size={25} name="add" />)
        }} />
        <Drawer.Screen
            name="Moderator"
            component={() => (
                <Stack.Navigator>
                    <Stack.Screen name="Moderator" component={Moderator} options={{
                        headerShown: false
                    }} />
                    <Stack.Screen name="ApproveConfessions" component={ApproveConfessions} options={{
                        headerShown: false
                    }} />


                </Stack.Navigator>)}
            options={{
                unmountOnBlur: true,
                drawerLabel: 'Your Channels',
                drawerLabelStyle: { marginLeft: -25 }, drawerIcon: () => (<MaterialCommunityIcons color='#663399' size={25} name="check" />), title: 'Moderate', drawerActiveTintColor: '#663399', drawerInactiveTintColor: '#FFFFFF'
            }} />







    </Drawer.Navigator>
}

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="WelcomeScreen1" component={WelcomeScreen1} options={{
                title: null,
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} options={{
                title: null,
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="WelcomeScreen3" component={WelcomeScreen3} options={{
                title: null,
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="Login" component={Login} options={{
                title: null,
                headerShown: false,
                animation: 'slide_from_right'
            }} />
            <Stack.Screen name="Register" component={Register} options={{
                title: null,
                headerShown: false,
                animation: 'slide_from_right'
            }} />
        </Stack.Navigator>
    )
}


const Main = () => {
    const [channels, setChannels] = useState([])
    const [splash, setSplash] = useState(true)
    const { isLoggedIn, changeIsLoggedIn } = Auth.useAuth();
    const [data, setData] = useState(null)

    useEffect(() => {
        CheckIsLoggedIn().then((res) => { changeIsLoggedIn(res.isLoggedIn); setSplash(false) })
    }, [])

    useEffect(() => {
        if (isLoggedIn) {
            refetch()
        }
    }, [isLoggedIn])

    const refetch = () => {
        GetChannels().then((res) => { setData(res);  })

    }

    return (
        <NavigationContainer>
            {splash ? (<Stack.Navigator><Stack.Screen name="Splash" component={Splash} /></Stack.Navigator>) :
                <>
                    {isLoggedIn ? <AllComponents data={data} refetch={refetch} /> : <AuthStack />}
                </>
            }

        </NavigationContainer>
    )
}

export default Main