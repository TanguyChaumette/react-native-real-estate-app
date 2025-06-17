import { Tabs } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";

import icons from '@/constants/icons';

const TabIcon = ({ focused, icon, title }: {focused: boolean; icon: any; title: string}) => (
    <View className="flex-1 flex flex-col items-center">
        <Image 
            source={icon}
            className="size-6"
            resizeMode="contain"
            tintColor={focused ? "#0061FF" : "#666876"}
        />
        <Text 
            className={`${focused ? "text-primary-300 font-rubik-medium" : "text-black-200 font-rubik"} text-xs w-full text-center mt-1`}
            style={{ fontFamily: focused ? "Rubik-Medium" : "Rubik-Regular" }}
        >
            {title}
        </Text>
    </View>
)

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "white",
                    position: "absolute",
                    borderTopColor: '#0061FF1A',
                    borderTopWidth: 1,
                    minHeight: 70,
                    paddingBottom: 10,
                    paddingTop: 10
                },
                tabBarShowLabel: false
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon icon={icons.home} focused={focused} title="Home"/>
                    )
                }}
            />
            <Tabs.Screen 
                name="explore"
                options={{
                    title: "Explore",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon icon={icons.search} focused={focused} title="Explore"/>
                    )
                }}
            />
            <Tabs.Screen 
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <TabIcon icon={icons.person} focused={focused} title="Profile"/>
                    )
                }}
            />
        </Tabs>
    )
}

export default TabsLayout;