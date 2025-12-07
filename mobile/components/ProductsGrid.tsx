

import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native'
import React from 'react'
import { Product } from '@/types';
import useWishlist from '@/hooks/useWishlist';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import useCart from '@/hooks/useCart'

interface ProductsGridProps {
  isLoading : boolean;
  isError: boolean;
  products: Product[]
}

const ProductsGrid = ({ products, isLoading, isError }: ProductsGridProps) => {

  const { 
    isInWishlist, 
    toggleWishlist, 
    addToWishlist, 
    removeFromWishlist, 
    isAddingToWishlist, 
    isRemovingFromWishlist
  } = useWishlist()

  const { isAddingToCart, addToCart } = useCart();

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(
      { productId, quantity: 1 },
      {
        onSuccess: () => {
          Alert.alert("Success", `${productName} added to cart!`);
        },
        onError: (error: any) => {
          Alert.alert("Error", error?.response?.data?.error || "Failed to add to cart");
        },
      }
    );
  };


  const renderProducts = ({ item:product }: {item: Product}) => {
    return(
      <TouchableOpacity
      className="bg-surface rounded-3xl overflow-hidden mb-3"
      style={{ width: "48%" }}
      activeOpacity={0.8}
      onPress={() => router.push(`/product/${product._id}` as any)}
    >
      <View className="relative">
        <Image
          source={{ uri: product.image[0] }}
          className="w-full h-44 bg-background-lighter"
          resizeMode="cover"
        />

        <TouchableOpacity
          className="absolute top-3 right-3 bg-black/30 backdrop-blur-xl p-2 rounded-full"
          activeOpacity={0.7}
          onPress={() => toggleWishlist(product._id)}
          disabled={isAddingToWishlist || isRemovingFromWishlist}
        >
          {isAddingToWishlist || isRemovingFromWishlist ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Ionicons
              name={isInWishlist(product._id) ? "heart" : "heart-outline"}
              size={18}
              color={isInWishlist(product._id) ? "#FF6B6B" : "#FFFFFF"}
            />
          )}
        </TouchableOpacity>
      </View>

      <View className="p-3">
        <Text className="text-text-secondary text-xs mb-1">{product.category}</Text>
        <Text className="text-text-primary font-bold text-sm mb-2" numberOfLines={2}>
          {product.name}
        </Text>

        <View className="flex-row items-center mb-2">
          <Ionicons name="star" size={12} color="#FFC107" />
          <Text className="text-text-primary text-xs font-semibold ml-1">
            {product.averageRating.toFixed(1)}
          </Text>
          <Text className="text-text-secondary text-xs ml-1">({product.totalReviews})</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-primary font-bold text-lg">${product.price.toFixed(2)}</Text>

          <TouchableOpacity
            className="bg-primary rounded-full w-8 h-8 items-center justify-center"
            activeOpacity={0.7}
            onPress={() => handleAddToCart(product._id, product.name)}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? (
              <ActivityIndicator size="small" color="#121212" />
            ) : (
              <Ionicons name="add" size={18} color="#121212" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
    )
  }


  return (
    <FlatList 
      data={products}
      renderItem={renderProducts}
      keyExtractor={item => item._id}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      showsVerticalScrollIndicator={false}
      scrollEnabled={false}
      ListEmptyComponent={NoProductsFound}
      contentContainerClassName='gap-6'
    />
  )
}

export default ProductsGrid

function NoProductsFound() {
  return(
    <View className='py-20 items-center justify-center'>
      <Ionicons name='search-outline' size={93} color={"#1DB954"} />
      <Text className='text-text-primary font-semibold mt-4'>No Products Found</Text>
      <Text className='text-text-secondary text-sm mt-2'>Try Adjusting your filters</Text>
    </View>
  )
}