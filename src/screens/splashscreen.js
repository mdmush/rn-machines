import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RED} from '../constants';

export default function Splashscreen() {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('main');
    }, 2000);
  }, []);
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-white flex-1 px-4">
        <View className="flex-1 justify-center items-center">
          <Text className="text-[40px] font-bold" style={{color: RED}}>
            Welcome to Machine Manager
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
