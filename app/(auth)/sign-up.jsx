import React, { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Dimensions, Alert, Image } from "react-native";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import FormField from "../../components/FormField";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BACKEND_API_URL = "http://localhost:3001/api/v1";

const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const submit = async () => {
    if (
      (form.firstName === "" || form.lastName === "",
      form.email === "" || form.password === "" || form.confirmPassword === "")
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    const validateEmail = (email) => {
      // Basic email regex pattern
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validatePassword = (password) => {
      // Password regex pattern
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      return passwordRegex.test(password);
    };

    const checkIfPasswordsMatch = (password, confirmPassword) => {
      return password === confirmPassword;
    };

    // Validate email format
    if (!validateEmail(form.email)) {
      Alert.alert("Error", "Invalid email format");
      return; // Exit the function if email is invalid
    }

    // Validate password strength
    if (!validatePassword(form.password)) {
      Alert.alert(
        "Error",
        "Password must be at least 8 characters long, include one uppercase letter, one lowercase letter, and one number"
      );
      return; // Exit the function if password does not meet criteria
    }
    if (!checkIfPasswordsMatch(form.password, form.confirmPassword)) {
      Alert.alert("Error", "Passwords do not match");
      return; // Exit the function if passwords do not match
    }
    setSubmitting(true);

    try {
      const response = await axios.post(
        `${BACKEND_API_URL}/auth/register`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      await AsyncStorage.setItem("user_name", form.firstName);
      router.push("(tabs)/home");
    } catch (error) {
      // Handle any errors from submission
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(error);
    } finally {
      setSubmitting(false); // Always reset the submitting state
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View
          className="w-full flex justify-center h-full px-4 my-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.homeIcon}
            resizeMode="contain"
            className="w-[115px] h-[34px] mx-auto"
          />
          <Text className="text-2xl font-semibold text-black mt-10 font-psemibold">
            Sign Up to Home Finder
          </Text>

          <FormField
            title="First name"
            value={form.firstName}
            handleChangeText={(e) => setForm({ ...form, firstName: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Last name"
            value={form.lastName}
            handleChangeText={(e) => setForm({ ...form, lastName: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <FormField
            title="Confirm password"
            value={form.confirmPassword}
            handleChangeText={(e) => setForm({ ...form, confirmPassword: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-900 font-pregular">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
