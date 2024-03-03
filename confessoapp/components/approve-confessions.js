import React, { useEffect, useState } from 'react'
import { FlatList, View, Text, ActivityIndicator } from 'react-native'
import { CONTRACT_ADDRESS } from '../consts/addresses'
import Ionicons from '@expo/vector-icons/Ionicons'
import Feather from '@expo/vector-icons/Feather'
import { ApproveConfessionAPI, GetUnapprovedConfessions } from './functions'
import { useIsFocused } from '@react-navigation/native'
import { Alert, HStack, Spinner, VStack, useToast } from 'native-base'
import MyToast from './mytoast'
const ApproveConfessions = ({ navigation, route }) => {

    const focus = useIsFocused()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState([])
    const [isApproveLoading, setIsApproveLoading] = useState({})
    const toast = useToast()
    const { channel_id } = route.params

    useEffect(() => {
        GetUnapprovedConfessions(channel_id).then((res) => { console.log(res.data); setData(res.data); setIsLoading(false) })
    }, [focus])
    const ApproveConfession = async (item) => {
        setIsApproveLoading((data) => ({ ...data, ...{ [item.id]: true } }))
        console.log(item);
        ApproveConfessionAPI(item.id).then((res) => {
            if (res) {
                setData(data.pop(item));
                setIsApproveLoading((data) => ({ ...data, ...{ [item.id]: false } }))

                toast.show({
                    render: () => <Alert status='success'>
                        <VStack space={2} flexShrink={1} w="100%">
                            <HStack flexShrink={1} space={2} justifyContent="space-between">
                                <HStack space={2} flexShrink={1}>
                                    <Alert.Icon mt="1" />
                                    <Text fontSize="md" color="coolGray.800">
                                        Approved!        </Text>
                                </HStack>

                            </HStack>
                        </VStack>
                    </Alert>
                })
            }

        }
        )
    }


    return (
        <View style={{ height: '100%', justifyContent: 'flex-start', backgroundColor: '#121212' }}>
            {isLoading ? <ActivityIndicator /> : <>{data?.length === 0 ? <Text style={{ color: 'white', textAlign: 'center', fontWeight: '300' }}>No confessions to approve right now</Text> :
                <FlatList data={data} contentContainerStyle={{ justifyContent: 'flex-start' }} renderItem={({ item }) => (
                    <View style={{ marginHorizontal: 10, padding: 10, borderWidth: 1, borderRadius: 7, marginVertical: 5, backgroundColor: '#27272a', flexDirection: 'row' }}>

                        <View style={{ width: '90%' }}>
                            <Text style={{ fontSize: 18, color: 'white' }} >{item.confession}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            {isApproveLoading[item.id] ? <Spinner color='white'></Spinner> : <Feather onPress={() => { ApproveConfession(item) }} style={{ alignSelf: 'center', marginRight: 5 }} size={25} color='lightgreen' name='check' />}
                        </View>
                    </View>)} />
            }</>
            }
        </View>
    )
}

export default ApproveConfessions