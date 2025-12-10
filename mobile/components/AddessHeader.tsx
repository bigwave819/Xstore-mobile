

import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const AddessHeader = () => {
  return (
    <View className='px-6 pb-5 border-b border-surface flex-row items-center'>
      <TouchableOpacity onPress={() => router.back()} className="mr-4">
        <Ionicons name='arrow-back' size={28} color={'#ffff'} />
      </TouchableOpacity>
      <Text className='text-text-primary text-2xl font-bold'>My Address</Text>
    </View>
  )
}

export default AddessHeader