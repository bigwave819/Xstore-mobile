

import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import SafeScreen from '@/components/SafeScreen'
import useWishlist from '@/hooks/useWishlist'
import useCart from '@/hooks/useCart'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'

const Wishlist = () => {

  const { removeFromWishlist, wishlist, isError, isRemovingFromWishlist, isLoading } = useWishlist()
  const { addToCart, isAddingToCart } = useCart()

  const handleRemoveFromWishlist = (productId: string, productName: string) => {
    Alert.alert("Remove from wishlist", `Remove ${productName} from wishlist`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",

        onPress: () => removeFromWishlist(productId),
      },
    ]);
  };

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => Alert.alert("Success", `${productName} added to cart!`),
        onError: (error: any) => {
          Alert.alert("Error", error?.response?.data?.error || "Failed to add to cart");
        },
      }
    );
  };

  if (isLoading) return <LoadingUI />;
  if (isError) return <ErrorUI />;

  return (
    <SafeScreen>
      {/** HEADER */}
      <View className='px-6 pb-5 border-b border-surface flex-row items-center justify-between pt-5'>
        <View className='space-x-4 flex-row'>
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text className='text-2xl text-gray-200'>Wishlist</Text>
        </View>
        <View>
          <Text className='text-text-secondary text-sm'>{wishlist.length} {wishlist.length === 1 ? "item" : "items"}</Text>
        </View>
      </View>

      {/** wishList card */}

      {wishlist.length === 0 ? (
        <View className='flex-1 items-center justify-center px-6 mx-5'>
          <Ionicons name='heart-outline' size={80} color={'#f8f8f8'} />
          <Text className="text-text-primary font-semibold text-xl mt-4">
            Your wishlist is empty
          </Text>
          <Text className="text-text-secondary text-center mt-2">
            Start adding products you love!
          </Text>
          <TouchableOpacity
            className="bg-primary rounded-2xl px-8 py-4 mt-6"
            activeOpacity={0.8}
            onPress={() => router.push("/(tabs)")}
          >
            <Text className="text-background font-bold text-base">Browse Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          <View className="px-6 py-4">
            {wishlist.map((item) => (
              <TouchableOpacity
                key={item._id}
                className="bg-surface rounded-3xl overflow-hidden mb-3"
                activeOpacity={0.8}
              // onPress={() => router.push(`/product/${item._id}`)}
              >
                <View className="flex-row p-4">
                  <Image
                    source={{ uri: item.image[0] }}
                    className="rounded-2xl bg-background-lighter"
                    style={{ width: 96, height: 96, borderRadius: 8 }}
                  />

                  <View className="flex-1 ml-4">
                    <Text className="text-text-primary font-bold text-base mb-2" numberOfLines={2}>
                      {item.name}
                    </Text>
                    <Text className="text-primary font-bold text-xl mb-2">
                      ${item.price.toFixed(2)}
                    </Text>

                    {item.stock > 0 ? (
                      <View className="flex-row items-center">
                        <View className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                        <Text className="text-green-500 text-sm font-semibold">
                          {item.stock} in stock
                        </Text>
                      </View>
                    ) : (
                      <View className="flex-row items-center">
                        <View className="w-2 h-2 bg-red-500 rounded-full mr-2" />
                        <Text className="text-red-500 text-sm font-semibold">Out of Stock</Text>
                      </View>
                    )}
                  </View>

                  <TouchableOpacity
                    className="self-start bg-red-500/20 p-2 rounded-full"
                    activeOpacity={0.7}
                    onPress={() => handleRemoveFromWishlist(item._id, item.name)}
                    disabled={isRemovingFromWishlist}
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
                {item.stock > 0 && (
                  <View className="px-4 pb-4">
                    <TouchableOpacity
                      className="bg-primary rounded-xl py-3 items-center"
                      activeOpacity={0.8}
                      onPress={() => handleAddToCart(item._id, item.name)}
                      disabled={isAddingToCart}
                    >
                      {isAddingToCart ? (
                        <ActivityIndicator size="small" color="#121212" />
                      ) : (
                        <Text className="text-background font-bold">Add to Cart</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}

    </SafeScreen>
  )
}

export default Wishlist

function LoadingUI() {
  return (
    <SafeScreen>
      <View className="px-6 pb-5 border-b border-surface flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text className="text-text-primary text-2xl font-bold">Wishlist</Text>
      </View>
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#00D9FF" />
        <Text className="text-text-secondary mt-4">Loading wishlist...</Text>
      </View>
    </SafeScreen>
  );
}

function ErrorUI() {
  return (
    <SafeScreen>
      <View className="px-6 pb-5 border-b border-surface flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>
        <Text className="text-text-primary text-2xl font-bold">Wishlist</Text>
      </View>
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
        <Text className="text-text-primary font-semibold text-xl mt-4">
          Failed to load wishlist
        </Text>
        <Text className="text-text-secondary text-center mt-2">
          Please check your connection and try again
        </Text>
      </View>
    </SafeScreen>
  );
}