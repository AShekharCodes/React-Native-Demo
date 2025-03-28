import { View, Image, TextInput } from "react-native";
import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value?: string;
  onPress?: () => void;
}

const SearchBar = ({ placeholder, onPress, value }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
      <Image
        source={icons.search}
        className="w-5 h-5 "
        resizeMode="contain"
        tintColor="#AB8BFF"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value=""
        onChangeText={() => {}}
        placeholderTextColor="#A8B5D5"
        className="flex-1 ml-2 text-white"
        placeholderClassName="#A8B5DB"
      />
    </View>
  );
};

export default SearchBar;
