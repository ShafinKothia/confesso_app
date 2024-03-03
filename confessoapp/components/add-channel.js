import React, { useState } from 'react'
import { Button, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CONTRACT_ADDRESS } from '../consts/addresses'
import axios from 'axios'
import { Alert, HStack, Spinner, VStack, useToast } from 'native-base'
import { AddChannelAPI } from './functions'
function AddChannel() {
  const navigation = useNavigation()
  const [channel, setChannel] = useState("")
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const AddChannel = () => {
    const pattern = /^(?!^\s+$)[a-zA-Z0-9\s]*$/;

    if (pattern.test(channel)) {
      setLoading(true)

      AddChannelAPI(channel).then((res) => {
        setLoading(false)
        toast.show({
          render: () => <Alert status='success'><VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  Created Channel Succesfully. Channel Id: {res.data.quick_name}
                </Text>
              </HStack>

            </HStack>
          </VStack></Alert>
        })
      })
    }
  }

  return (

    <View style={{ height: '100%', justifyContent: 'center', backgroundColor: '#121212' }}>
      <View style={{ height: '100%', justifyContent: 'center', backgroundColor: '#121212' }}>
        <TextInput placeholder='Channel Name' placeholderTextColor="gray" style={{
          width: 200, height: 40, borderRadius: 10, paddingHorizontal: 10, color: 'white', borderWidth: 1, alignSelf: 'center', textAlignVertical: 'center', borderColor: 'white',
        }} onChangeText={(e) => { setChannel(e) }}></TextInput>
        <TouchableOpacity disabled={loading} onPress={() => { AddChannel() }} style={{ width: 200, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 40, backgroundColor: "#663399", borderRadius: 10, alignSelf: 'center', marginTop: 10 }}>
          <Text style={{ 'textAlign': 'center', fontWeight: '400', color: 'white' }}>Create</Text>
          {loading ? <Spinner color='white' > </Spinner> : null}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddChannel