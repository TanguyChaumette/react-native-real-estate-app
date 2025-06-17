import icons from "@/constants/icons";
import images from "@/constants/images";
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const { refetch, loading: contextLoading, isLogged } = useGlobalContext();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (isLogged) {
      router.replace("/(root)/(tabs)");
    }
  }, [isLogged]);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    
    try {
      setIsLoggingIn(true);
      const result = await login();

      if (result) {
        await refetch();
      } else {
        Alert.alert("Error", "Failed to login");
      }
    } catch (error) {
      console.error("Login error:", error);
      Alert.alert("Error", "An unexpected error occurred");
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (contextLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#0061FF" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to Restate
          </Text>
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's get you closer to {"\n"}
            <Text className="text-primary-300">your ideal Home</Text>
          </Text>
          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to Restate with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            disabled={isLoggingIn}
            className={`flex flex-row items-center justify-center bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5 ${isLoggingIn ? 'opacity-50' : ''}`}
          >
            {isLoggingIn ? (
              <ActivityIndicator size="small" color="#0061FF" />
            ) : (
              <>
                <Image
                  source={icons.google}
                  className="w-5 h-5"
                  resizeMode="contain"
                />
                <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                  Continue with Google
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;
