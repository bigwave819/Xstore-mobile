

import { View, Text, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { useState } from 'react'
import SafeScreen from '@/components/SafeScreen'
import { Ionicons } from '@expo/vector-icons'

const index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const CATEGORIES = [
    { name: "All", icon: "grid-outline" as const },
    { name: "Electronics", image: require("@/assets/images/electronics.png") },
    { name: "Fashion", image: require("@/assets/images/fashion.png") },
    { name: "Sports", image: require("@/assets/images/sports.png") },
    { name: "Books", image: require("@/assets/images/books.png") },
  ];

  return (
    <SafeScreen>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/** HEADER */}
        <View className='px-5 pb-4 pt-6'>
          <View className='flex-row items-center justify-between'>
            <View>
              <Text className='font-bold text-white text-5xl'>Shop</Text>
              <Text className='text-gray-400'>Browser all products</Text>
            </View>
            <TouchableOpacity
              className='p-3 rounded-full bg-surface/50'
              activeOpacity={0.7}
            >
              <Ionicons name='options-outline' size={22} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </View>

        {/** SEARCHBAR */}
        <View
          className='bg-surface flex-row items-center px-5 py-2 rounded-2xl mx-5'
        >
          <Ionicons name='search' size={22} color={'#fff'} />
          <TextInput
            placeholder='Search for products'
            placeholderTextColor={'#fff'}
            className='flex-1 ml-3 text-base text-text-primary'
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/** CATEGORY FILTER */}
        <View className='my-6'>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category.name}
                onPress={() => { }}
                className='mr-3 rounded-2xl size-20 overflow-hidden items-center justify-center bg-surface'
              >
                {category.icon ? (
                  <Ionicons name={category.icon} size={36} color="#fff" />
                ) : (
                  <Image source={category.image} className="size-12" resizeMode="contain" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeScreen>
  )
}

export default index