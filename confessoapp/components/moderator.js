import axios from 'axios'
// import { Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { GetCreatedConfessions } from './functions'
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import { Spinner } from 'native-base'

export default function Moderator({ navigation }) {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    
    GetCreatedConfessions().then((res) => { setData(res); setIsLoading(false) })
  }, [])
  return (
    <View style={{ height: '100%', width: '100%', backgroundColor: '#121212', }} >
      {isLoading ? <Spinner /> : <>{data?.length === 0 ? <Text style={{ color: 'white', textAlign: 'center', fontWeight: '300', fontSize: 30 }}>You have not created any channels</Text> :
        <FlatList data={data} contentContainerStyle={{ justifyContent: 'flex-start' }} renderItem={({ item }) => (
          <TouchableOpacity onPress={() => { navigation.navigate('ApproveConfessions', { channel_id: item.id }) }} style={{ marginHorizontal: 10, padding: 10, borderWidth: 1, borderRadius: 7, marginVertical: 5, backgroundColor: '#27272a', flexDirection: 'row' }}>

            <View style={{ width: '45%' }}>
              <Text style={{ fontSize: 18, color: 'white' }} >{item.name}</Text>
            </View>
            <View style={{ width: '65%' }}>
              <Text style={{ fontSize: 18, color: 'gray' }} >ID: {item.quick_name}</Text>
            </View>

          </TouchableOpacity>)} />
      }</>}
    </View>
  )
}

