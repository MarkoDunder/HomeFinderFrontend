import { useState, SyntheticEvent } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";

const BACKEND_API_URL = "http://localhost:3001/api/v1";

const SignIn = () => {
  //const { setUser, setIsLogged } = useGlobalContext();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChangeText = (name, value) => {
    setForm({ ...form, [name]: value });
  };

  const submit = async (e) => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setSubmitting(true);

    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/auth/login`,
        form,
        {
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { token, firstName } = response.data;

      await AsyncStorage.setItem("jwt_token", token); // Save token in local storage
      await AsyncStorage.setItem("user_name", firstName); // Save user name in local storage

      // Navigate to the home page
      router.push("/(tabs)/home"); // Navigate to home page
    } catch (error) {
      // Handle any errors from submission
      console.error(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false); // Always reset the submitting state
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 mt-4" // Adjusted margin-top
          style={{
            minHeight: Dimensions.get("window").height - 100,
            marginTop: -20, // Move the entire form upwards by 20 units
          }}
        >
          <View className="w-full flex items-center mt-4">
            <Image
              source={images.homeIcon}
              resizeMode="contain"
              className="w-[115px] h-[34px]"
            />
          </View>

          <Text className="text-xl text-gray-900 font-pregular text-left mt-4">
            Log in to Home Finder
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(value) => handleChangeText("email", value)}
            otherStyles="mt-7"
            keyboardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(value) => handleChangeText("password", value)}
            otherStyles="mt-7"
            secureTextEntry
          />

          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex flex-row justify-center items-center pt-5 space-x-2">
            <Text className="text-lg text-gray-950 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignIn;
