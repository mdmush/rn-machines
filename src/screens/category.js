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
  addItem,
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
                {mach.data &&
                  Object.values(mach.data).map(cat => {
                    let item = Object.values(mach.attributes);
                    if (machines[mach.id]) {
                      let titleAttr = mach.title;
                      let filteredArr = item.filter(it => {
                        if (it.id === titleAttr) {
                          return it;
                        }
                      });
                      console.log('filteredArr', filteredArr);
                      return (
                        <View
                          key={cat.id}
                          className="border border-[#ccc] rounded-md drop-shadow-md p-4 bg-white mb-4">
                          <Text className="font-bold text-[20px] text-black">
                          {filteredArr.length > 0
                              ? cat.data[filteredArr[0].name] ? cat.data[filteredArr[0].name].value : 'Item'
                              : 'Item'}
                          </Text>
                          <View className="mt-4">
                            {Object.values(machines[mach.id].attributes).map(
                              it => {
                                if (it.type === 'text') {
                                  return (
                                    <TextInput
                                      label={it.name}
                                      value={mach.data[cat.id].data[it.name] ? mach.data[cat.id].data[it.name].value : ''}
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
                                } else if (it.type === 'date') {
                                  return (
                                    <View>
                                      <TextInput
                                        label={it.name}
                                        value={mach.data[cat.id].data[it.name] ? mach.data[cat.id].data[it.name].value : ''}
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
                                } else if (it.type === 'number') {
                                  return (
                                    <TextInput
                                      label={it.name}
                                      value={mach.data[cat.id].data[it.name] ? mach.data[cat.id].data[it.name].value : ''}
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
                                } else if (it.type === 'checkbox') {
                                  return (
                                    <View className="flex-row items-center">
                                      <Switch
                                        value={mach.data[cat.id].data[it.name] && mach.data[cat.id].data[it.name].value === true ? true : false}
                                        className="my-2"
                                        onChange={() => {
                                          dispatch(
                                            updateItem({
                                              catID: mach.id,
                                              itemID: cat.id,
                                              itemName: it.name,
                                              itemValue: mach.data[cat.id].data[it.name] && mach.data[cat.id].data[it.name].value === true
                                                ? false
                                                : true,
                                            }),
                                          );
                                        }}
                                      />
                                      <Text className="ml-2 text-black">
                                        {it.name}
                                      </Text>
                                    </View>
                                  );
                                }
                              },
                            )}
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
      <Button
        mode="contained"
        style={{borderRadius: 5, marginTop: 20, margin: 10}}
        onPress={() =>
          dispatch(
            addItem({
              catID: data.id,
              itemID: `data-${
                machines[data.id].data
                  ? Object.keys(machines[data.id].data).length + 1
                  : 0
              }`,
            }),
          )
        }>
        ADD NEW ITEM
      </Button>
    </>
  );
}
