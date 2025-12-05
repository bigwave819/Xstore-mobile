import { useSSO } from '@clerk/clerk-expo';
import { useState } from 'react';
import { Alert } from 'react-native';

function useSocialAuth() {
    const [loadingStrategy, setLoadingStrategy] = useState<string | null>(null);
    const { startSSOFlow } = useSSO()

    const handleSocialAuth = async (strategy: "oauth_google" | 'oauth_apple') => {
        setLoadingStrategy(strategy);

        try {
            const { createdSessionId, setActive } = await startSSOFlow({ strategy })

            if (createdSessionId && setActive) {
                await setActive({ session: createdSessionId })
            }
        } catch (error) {
            console.error('errro in social auth: ', error);
            const provider = strategy === "oauth_apple" ? 'Apple' : 'Google'
            Alert.alert("Error", `failed to login with the ${provider}.Please try again`)
        } finally {
            setLoadingStrategy(null)
        }
    }

    return { loadingStrategy, handleSocialAuth }
}

export default useSocialAuth