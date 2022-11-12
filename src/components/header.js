import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function Header({text = '', navigation = useNavigation()}) {
  return (
    <View className="flex bg-white py-5 px-4 justify-between flex-row items-center border-b">
      <View className="flex-1">
        <View className="flex-row items-center pr-6">
          <TouchableOpacity
            onPress={() => {
             navigation.toggleDrawer()
            }}
            className="mr-4">
            <Ionicons name={'ios-menu'} size={26} color={'#000'} />
          </TouchableOpacity>
          <Text numberOfLines={1} className="flex-1 text-[20px] text-black font-bold">
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
}
