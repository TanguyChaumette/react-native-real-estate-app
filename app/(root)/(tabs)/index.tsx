import images from "@/constants/images";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="px-5">
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center">
            <Image source={images.avatar} className="size-12 rounded-full"/>
            <View className="flex flex-col items-start ml-2 justify-center">
              <Text>
                Good Morning
              </Text>
              <Text>
                Adrian
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
