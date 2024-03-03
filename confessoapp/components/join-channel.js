import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Button, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CONTRACT_ADDRESS } from '../consts/addresses'
import { JoinChannelAPI } from './functions'
import { Alert, HStack, Spinner, VStack, useToast } from 'native-base'
import { TouchableOpacity } from 'react-native-gesture-handler'


function JoinChannel({ route }) {
  const navigation = useNavigation()
  const [channel, setChannel] = useState("")
    const [loading, setLoading] = useState(false)

  const toast = useToast()
  useEffect(() => {
  })
  const GetInChannel = () => {
    setLoading(true)
    JoinChannelAPI(channel).then((res) => {
      setLoading(false)
      route?.params?.refetch()
      console.log(res), toast.show({
        render: () => <Alert status='success'><VStack space={2} flexShrink={1} w="100%">
          <HStack flexShrink={1} space={2} justifyContent="space-between">
            <HStack space={2} flexShrink={1}>
              <Alert.Icon mt="1" />
              <Text fontSize="md" color="coolGray.800">
                Joined Channel Succesfully
              </Text>
            </HStack>

          </HStack>
        </VStack></Alert>
      })
    }).catch((err) => {
      setLoading(false)
      toast.show({
        render: () => <Alert status='error'>
          <VStack space={2} flexShrink={1} w="100%">
            <HStack flexShrink={1} space={2} justifyContent="space-between">
              <HStack space={2} flexShrink={1}>
                <Alert.Icon mt="1" />
                <Text fontSize="md" color="coolGray.800">
                  {err.detail}
                </Text>
              </HStack>

            </HStack>
          </VStack>
        </Alert>
      })
    })
  }


  return (
    <View style={{ height: '100%', justifyContent: 'center', backgroundColor: '#121212' }}>
      <TextInput placeholder='Channel Id' placeholderTextColor="gray" style={{
        width: 200, height: 40, borderRadius: 10, paddingHorizontal: 10, color: 'white', borderWidth: 1, alignSelf: 'center', textAlignVertical: 'center', borderColor: 'white',
      }} onChangeText={(e) => { setChannel(e) }}></TextInput>
      <TouchableOpacity disabled={loading} onPress={() => { GetInChannel() }} style={{ width: 200, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', height: 40, backgroundColor: "#663399", borderRadius: 10, alignSelf: 'center', marginTop: 10 }}>
        <Text style={{ 'textAlign': 'center', fontWeight: '400', color: 'white' }}>Join</Text>
        {loading ? <Spinner color='white' > </Spinner> : null}
      </TouchableOpacity>
    </View>
  )
}

export default JoinChannel