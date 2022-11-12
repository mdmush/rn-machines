import {View, Text, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {RED} from '../constants';
import Header from '../components/header';

export default function Dashboard(props) {
  return (
    <>
      <Header text="Dashboard" navigation={props.navigation} />
      <View className="flex-1">
        <View className="bg-white flex-1 p-4 bg-[#f2f2f2]">
          <View className="flex-1">
            <Text>Dashboard</Text>
          </View>
        </View>
      </View>
    </>
  );
}
