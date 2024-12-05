import React, { useState } from 'react'
import { Button, Text, TextInput, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CONTRACT_ADDRESS } from '../consts/addresses'
function AddName() {
  const navigation = useNavigation()
  const [name, setName] = useState("")
  return (
    <View style={{ height: '100%', justifyContent: 'center', }}>
      <TextInput  style={{
        width: 75, height: '40', borderRadius: 25, borderWidth: 1, alignSelf: 'center', textAlignVertical: 'top'
      }} onChangeText={(e) => {setName(e)}}></TextInput>
      <View style={{width: '50%', alignSelf: 'center', marginTop: 10}}>
      </View>
    </View>
  )
}

export default AddName