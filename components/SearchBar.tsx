// SearchBar.tsx
import React, { forwardRef } from "react";
import { View, Image, TextInput, TextInputProps } from "react-native";
import { icons } from "@/constants/icons";

interface Props extends TextInputProps {
  placeholder: string;
}

const SearchBar = forwardRef<TextInput, Props>(
  ({ placeholder, value, onChangeText, ...rest }, ref) => {
    return (
      <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
        <Image
          source={icons.search}
          className="w-5 h-5"
          resizeMode="contain"
          tintColor="#AB8BFF"
        />
        <TextInput
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#A8B5D5"
          className="flex-1 ml-2 text-white"
          {...rest}
        />
      </View>
    );
  }
);

export default SearchBar;
