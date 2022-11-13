import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import { clearCategories } from '../state/reducer';

export default function Header({text = '', navigation = useNavigation(), cleardata = false}) {
  const dispatch = useDispatch();
  const {machines} = useSelector(state => state.machines);
  return (
    <View className="flex bg-white py-5 px-4 justify-between flex-row items-center">
      <View className="flex-1">
        <View className="flex-row items-center pr-6">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.toggleDrawer();
            }}
            className="mr-4">
            <Ionicons name={'ios-menu'} size={26} color={'#000'} />
          </TouchableOpacity>
          <Text
            numberOfLines={1}
            className="flex-1 text-[20px] text-black font-bold">
            {text}
          </Text>
        </View>
      </View>
      <View className="justify-center items-end">
        <View className="flex-row items-center">
          {cleardata ? (
            <TouchableOpacity activeOpacity={0.8} onPress={() => dispatch(clearCategories())} className="mr-2 w-8 h-8 rounded-full justify-center items-center">
              <FontAwesome name={"trash"} size={20} color={"#000"} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
}
