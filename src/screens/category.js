import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RED} from '../constants';
import Header from '../components/header';
import {
  addCategory,
  deleteCategory,
  deleteItem,
  setMachines,
  updateCategory,
  updateItem,
} from '../state/reducer';
import {TextInput, Button, Switch} from 'react-native-paper';

export default function Category(props) {
  const {data} = props.route.params;
  const dispatch = useDispatch();
  const {machines} = useSelector(state => state.machines);

  return (
    <>
      <Header text={data.name} navigation={props.navigation} />
      <ScrollView className="bg-white flex-1 p-4 bg-[#f2f2f2]">
        {Object.values(machines)
          .filter(mach => mach.id === data.id)
          .map(mach => {
            return (
              <View>
                {Object.values(mach.data).map(cat => {
                  let item = Object.values(cat.data);
                  if (machines[mach.id]) {
                    let titleAttr = mach.title;
                    let filteredArr = item.filter(it => {
                      if (it.type === titleAttr) {
                        return it;
                      }
                    });
                    return (
                      <View
                        key={cat.id}
                        className="border border-[#ccc] rounded-md drop-shadow-md p-4 bg-white mb-4">
                        <Text className="font-bold text-[20px] text-black">
                          {filteredArr[0].value}
                        </Text>
                        <View className="mt-4">
                          {item.map(it => {
                            if (mach.attributes[it.type].type === 'text') {
                              return (
                                <TextInput
                                  label={it.name}
                                  value={it.value}
                                  mode="outlined"
                                  onChangeText={text => {
                                    dispatch(
                                      updateItem({
                                        catID: mach.id,
                                        itemID: cat.id,
                                        itemName: it.name,
                                        itemValue: text,
                                      }),
                                    );
                                  }}
                                  className="my-2"
                                />
                              );
                            } else if (
                              mach.attributes[it.type].type === 'date'
                            ) {
                              return (
                                <View>
                                  <TextInput
                                  label={it.name}
                                  value={it.value}
                                  mode="outlined"
                                  onChangeText={text => {
                                    dispatch(
                                      updateItem({
                                        catID: mach.id,
                                        itemID: cat.id,
                                        itemName: it.name,
                                        itemValue: text,
                                      }),
                                    );
                                  }}
                                  className="my-2"
                                />
                                </View>
                              );
                            } else if (
                              mach.attributes[it.type].type === 'number'
                            ) {
                              return (
                                <TextInput
                                  label={it.name}
                                  value={it.value}
                                  mode="outlined"
                                  keyboardType="numeric"
                                  onChangeText={text => {
                                    // console.log('text', text);
                                    dispatch(
                                      updateItem({
                                        catID: mach.id,
                                        itemID: cat.id,
                                        itemName: it.name,
                                        itemValue: text,
                                      }),
                                    );
                                  }}
                                  className="my-2"
                                />
                              );
                            } else if (
                              mach.attributes[it.type].type === 'checkbox'
                            ) {
                              return (
                                <View className="flex-row items-center">
                                  <Switch value={it.value ? it.value : true} className="my-2" onChange={() => {
                                    dispatch(
                                      updateItem({
                                        catID: mach.id,
                                        itemID: cat.id,
                                        itemName: it.name,
                                        itemValue: it.value ? !it.value : false,
                                      }),
                                    );
                                  }} />
                                  <Text className="ml-2 text-black">
                                    {it.name}
                                  </Text>
                                </View>
                              );
                            }
                          })}
                        </View>
                        <View className="flex-row items-center">
                          <Button
                            icon="delete"
                            mode="outlined"
                            style={{
                              borderRadius: 5,
                              marginTop: 20,
                              borderColor: RED,
                            }}
                            onPress={() =>
                              dispatch(
                                deleteItem({catID: mach.id, itemID: cat.id}),
                              )
                            }>
                            REMOVE
                          </Button>
                        </View>
                      </View>
                    );
                  }
                })}
              </View>
            );
          })}
      </ScrollView>
    </>
  );
}
