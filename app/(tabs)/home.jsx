import { View, Text, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { router } from "expo-router";
import { icons } from "../../constants";

const Home = () => {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const name = await AsyncStorage.getItem("user_name");
        if (name !== null) {
          setUserName(name);
        }
      } catch (error) {
        console.error("Failed to load user name:", error);
      }
    };

    fetchUserName();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.setItem("jwt_token", "");
      await AsyncStorage.setItem("user_name", "");
      router.push("/sign-in"); // Redirect to the sign-in screen
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <View className="flex-1 p-5">
      <TouchableOpacity
        onPress={handleLogout}
        className="absolute top-5 right-5 p-2"
      >
        <Image
          source={icons.logout}
          className="w-7 h-7" // Adjust size as needed
        />
      </TouchableOpacity>
      <Text className="text-2xl text-center mt-10">
        Welcome home, {userName}!
      </Text>
    </View>
  );
};

export default Home;
