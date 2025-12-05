import { View } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeScreen = ({ children }: any) => {
  const inset = useSafeAreaInsets()

  return (
    <View
      className="flex-1 bg-background"
      style={{
        paddingTop: inset.top,
        paddingBottom: inset.bottom,
      }}
    >
      {children}
    </View>
  )
}

export default SafeScreen
