import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { CONTRACT_ADDRESS } from '../consts/addresses'
import Ionicons from '@expo/vector-icons/Ionicons'
import ToastManager, { Toast } from 'toastify-react-native'
import { GetAllConfessions, AddConfession as AddConfessionAPI, AddConfessionImage } from './functions'
import { Alert, HStack, Image, Popover, Spinner, VStack, useToast } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import GetImage from './get-image'
import axios from 'axios'
function AddConfession({ navigation, route }) {
  const [confession, setConfession] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSendLoading, setIsSendLoading] = useState(false)
  const [file, setFile] = useState(null)
  const [data, setData] = useState([])
  const focus = useIsFocused()
  const params = route.params
  const toast = useToast()


  useEffect(() => {
    setFile(null)
    setIsLoading(true)
    setIsSendLoading(false)
    getAllConfessions(params.id)
  }, [focus])

  const getAllConfessions = async (channel_id) => {
    await GetAllConfessions(channel_id).then((res) => { setData(res.data); setIsLoading(false) })
  }

  const uploadImage = async () => {
    await ImagePicker.getMediaLibraryPermissionsAsync()
    result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images, allowsEditing: true, aspect: [1, 1], quality: 1 })
    setFile({ ...result.assets[0], name: "FileName" })
  }

  const addConfession = async () => {

    if ((confession !== "" && Boolean(confession) === true && !(/^[ ]+$/.test(confession))) || Boolean(file)) {
      console.log(Boolean(file));

      setIsSendLoading(true)
      AddConfessionAPI(params.id, confession).then((res) => {
        console.log(res);
        if (Boolean(res)) {
          if (Boolean(file)) {
            const formData = new FormData();
            formData.append('image_in', {
              uri: file.uri,
              type: "image/jpeg",
              name: "filename.jpeg",
            });
            
            AddConfessionImage(formData, res.id)
          }
          toast.show({
            render: () => <Alert status='success'><VStack space={2} flexShrink={1} w="100%">
              <HStack flexShrink={1} space={2} justifyContent="space-between">
                <HStack space={2} flexShrink={1}>
                  <Alert.Icon mt="1" />
                  <Text fontSize="md" color="coolGray.800">
                    Confession Sent For Moderation                  </Text>
                </HStack>

              </HStack>
            </VStack></Alert>
          })
        }
        setIsSendLoading(false)
        setConfession("")
      })
    }
  }

  return (
    <View style={{ height: '100%', justifyContent: 'flex-end', backgroundColor: '#121212' }}>
      {/* {isLoadingChannels ? (null) : channels?.map((e, i) => {
        <Text>{e}</Text>
      })} */}
      <ToastManager />
      {isLoading ? <ActivityIndicator /> :
        <FlatList data={data} renderItem={({ item }) => (<View style={{ marginHorizontal: 10, padding: 10, borderWidth: 1, borderRadius: 7, marginVertical: 5, backgroundColor: '#27272a' }}>{Boolean(item.confession) ? <Text style={{ fontSize: 18, color: 'white', }} >{item.confession}</Text> : null }{Boolean(item.image_path) ? <Image alt='hi' source={{ uri: `apilinkconfessions/get_confession_image?id=` + item.image_path }} width="100%" style={{ aspectRatio: 1, borderRadius: 7, }} />
          : null}</View>)} />}
      <View style={{ flexDirection: 'row', marginBottom: 0 }}>
        <View style={{
          backgroundColor: '#27272a',
          width: '90%',
          height: 40,
          borderRadius: 10,
          elevation: 9,
          flexDirection: 'row',
          marginBottom: 5,
          paddingLeft: 15,
          paddingRight: 5,
          alignSelf: 'center',
          textAlignVertical: 'top',
          alignItems: 'center'
        }}>
          <TextInput style={{ color: 'white', flex: 1 }} value={confession} multiline numberOfLines={10} onChangeText={(e) => { setConfession(e) }}></TextInput>
          {params.images_allowed ?
            <Popover placement='top' trigger={triggerProps => { return <TouchableOpacity {...triggerProps} style={{ alignItems: 'center', justifyContent: 'center', }}><Ionicons style={{ alignSelf: 'center', }} color='#663399' size={35} name='image-outline' /></TouchableOpacity> }}>

              <Popover.Content w="56" margin={0} padding={0} style={{ backgroundColor: '#27272a' }}>

                <Popover.Body h="100%" style={{ backgroundColor: '#27272a' }} >
                  {Boolean(file) ? <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', }}><Text style={{ color: 'white', width: '90%' }}>Image 1</Text><Ionicons color='red' onPress={() => { setFile(null) }} style={{ marginRight: 'auto' }} size={20} name='trash-outline' /></View> : <Button title='Upload Image' color='#663399' onPress={() => { uploadImage() }}>Upload Image</Button>}

                </Popover.Body>
              </Popover.Content>
            </Popover>

            : null}
        </View>
        <View style={{ width: '10%', alignSelf: 'center', height: 40 }}>
          {isSendLoading ? <Spinner color='#663399'> </Spinner> :
            <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', }} onPress={() => { addConfession() }}><Ionicons style={{ alignSelf: 'center', }} color='#663399' size={35} name='push-outline' /></TouchableOpacity>
          }
        </View>
      </View>
    </View>
  )
}

export default AddConfession