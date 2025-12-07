
import React from 'react'
import { Redirect, Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useAuth } from '@clerk/clerk-expo'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { BlurView } from 'expo-blur'

const RootLayout = () => {

    const { isSignedIn, isLoaded } = useAuth()
    const insets = useSafeAreaInsets()

    if (!isLoaded) {
        return (
            <View className='flex-1 justify-center items-center'>
                <ActivityIndicator size={67} />
            </View>
        )
    };
    if (!isSignedIn) return <Redirect href="/(auth)" />;
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: '#1DB954',
                tabBarInactiveTintColor: '#B3B3B3',
                tabBarStyle: {
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    borderTopWidth: 0,
                    height: 32 + insets.bottom,
                    paddingTop: 4,
                    marginHorizontal: 100,
                    marginBottom: insets.bottom,
                    borderRadius: 24,
                    overflow: 'hidden'
                },
                tabBarBackground: () => (
                    <BlurView intensity={80} tint='dark' style={StyleSheet.absoluteFill} />
                ),
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 600
                }
            }}
        >
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Ionicons name='grid' size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='cart'
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ color, size }) => <Ionicons name='cart' size={size} color={color} />
                }}
            />
            <Tabs.Screen
                name='profile'
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => <Ionicons name='person' size={size} color={color} />
                }}
            />
        </Tabs>
    )
}

export default RootLayout