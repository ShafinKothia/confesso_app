import React from 'react'
import { View, Text, Image, Button } from 'react-native'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
const WelcomeScreen1 = ({ navigation }) => {

    return (
        <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212' }}>
            {/* <Ionicons color='#663399' size={200} name='lock-closed-outline' /> */}
            <View style={{ height: '80%', width: '100%', alignItems: 'center', justifyContent: 'center', }}>
                <Image source={require("../assets/anonymous.png")} style={{ height: 300, width: 300 }} />
                <Text style={{ color: 'white', textAlign: 'center', fontSize: 35, fontWeight: '400', }}> Confess Anonymously</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 100 }}>
                <View style={{width: '20%'}}></View>
                <View style={{width: '60%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}} >
                    <View style={{ height: 8, width: 8, borderRadius: 50, backgroundColor: '#663399', marginHorizontal: 3 }} />
                    <View style={{ height: 8, width: 8, borderRadius: 50, backgroundColor: 'white', marginHorizontal: 3 }} />
                    <View style={{ height: 8, width: 8, borderRadius: 50, backgroundColor: 'white', marginHorizontal: 3 }} />
                </View>
                <View style={{width: '20%', paddingRight: 20, alignItems: 'flex-end', justifyContent: 'center'}}>
                    <SimpleLineIcons color='white' size={35} name='arrow-right' onPress={() => { navigation.replace('WelcomeScreen2') }}></SimpleLineIcons>
                </View>
            </View>
        </View>
    )
}

export default WelcomeScreen1