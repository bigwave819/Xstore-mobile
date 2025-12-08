import { Text, TouchableOpacity, View, FlatList, ActivityIndicator, Image } from "react-native";
import React from "react";
import SafeScreen from "@/components/SafeScreen";
import useCart from "@/hooks/useCart";
import { Ionicons } from "@expo/vector-icons";

const CartScreen = () => {
  const { getCart, isRemovingFromCart, removeFromCart } = useCart();
  const { data: cart, isLoading, isError } = getCart;

  // SAFE array — always defined
  const items = cart?.items ?? [];


  if (isLoading) {
    return (
      <SafeScreen>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
          <Text className="text-text-secondary mt-4">Loading cart...</Text>
        </View>
      </SafeScreen>
    );
  }

  if (isError) {
    return (
      <SafeScreen>
        <View className="flex-1 justify-center items-center">
          <Text className="text-red-500 text-lg font-bold">Failed to load cart</Text>
        </View>
      </SafeScreen>
    );
  }

  const emptyList = () => {
    return(
      <View className="flex-1 justify-center items-center gap-4">
          <Ionicons name="cart-outline" size={80} color="#d4d4d4" />

          <Text className="text-text-primary text-lg font-semibold">Your cart is empty</Text>
          <Text className="text-text-secondary">Browse products and add something!</Text>

          <TouchableOpacity className="bg-primary px-5 py-3 rounded-xl mt-3">
            <Text className="text-white font-bold">Browse Products</Text>
          </TouchableOpacity>
        </View>
    )
  }

  return (
    <SafeScreen>
      {/* HEADER */}
      <View className="my-5 mx-5">
        <Text className="text-4xl font-bold text-gray-200">Cart</Text>
      </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 150 }}
          renderItem={({ item }) => (
            <View className="flex-row items-center bg-surface p-5 mx-5 rounded-xl">
              {/* PRODUCT IMAGE + QUANTITY BADGE */}
              <View className="relative">
                <Image
                  source={{ uri: item.product.image[0] }}
                  className="rounded-2xl bg-background-lighter"
                  style={{ width: 96, height: 96, borderRadius: 12 }}
                  resizeMode="cover"
                />
                <View className="absolute top-0 right-0 bg-primary rounded-full h-6 w-6 flex items-center justify-center">
                  <Text className="text-white text-sm">x{item.quantity}</Text>
                </View>
              </View>

              {/* PRODUCT INFO */}
              <View className="flex-1 ml-4 justify-between">
                <Text className="text-xl font-bold text-white">{item.product.name}</Text>

                {/* PRICE */}
                <View className="flex-row gap-2 mt-1">
                  <Text className="text-primary font-bold text-lg">$ {item.product.price}</Text>
                </View>

                {/* QUANTITY CONTROLS + DELETE */}
                <View className="flex-row items-center mt-3 justify-between">
                  {/* QUANTITY */}
                  <View className="flex-row items-center gap-2">
                    <TouchableOpacity className="bg-gray-700 rounded-full w-8 h-8 items-center justify-center">
                      <Text className="text-white text-2xl">-</Text>
                    </TouchableOpacity>

                    <Text className="text-white font-bold text-lg">{item.quantity}</Text>

                    <TouchableOpacity className="bg-primary rounded-full w-8 h-8 items-center justify-center">
                      <Text className="text-white text-2xl">+</Text>
                    </TouchableOpacity>
                  </View>

                  {/* DELETE BUTTON */}
                  <TouchableOpacity
                    className="bg-red-500/20 p-2 rounded-full"
                    activeOpacity={0.7}
                    onPress={() => removeFromCart(item.product._id)}
                    disabled={isRemovingFromCart}
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          contentContainerClassName="gap-6"
          ListEmptyComponent={emptyList}
        />
    </SafeScreen>
  );
};

export default CartScreen;
