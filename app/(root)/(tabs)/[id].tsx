import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Property = () => {
    const { is } = useLocalSearchParams();

    return (
        <View>
            <Text>Property {id}</Text>
        </View>
    );
}
export default Property;