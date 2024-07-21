import React from "react";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";

export default function App() {
  return (
    <SafeAreaView className=" bg-white h-full">
      <ScrollView contentContainerStyle={{ height: "70%" }}>
        <View className="w-full justify-center items-center h-full px-4 mt-10 ">
          <Image
            source={images.homeLogo}
            className="w-[200px] h-[150px]"
            resizeMode="contain"
          />

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
