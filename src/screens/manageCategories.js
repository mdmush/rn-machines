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
  addAttribute,
  addCategory,
  deleteAttribute,
  deleteCategory,
  setMachines,
  setTitle,
  updateAttributeValue,
  updateCategory,
} from '../state/reducer';
import {TextInput, Button} from 'react-native-paper';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

export default function ManageCategories(props) {
  const dispatch = useDispatch();
  const {machines} = useSelector(state => state.machines);
  const [text, settext] = useState('');

  return (
    <>
      <Header
        text="Manage Categories"
        navigation={props.navigation}
        cleardata
      />
      <ScrollView className="bg-white flex-1 p-4 bg-[#f2f2f2]">
        {Object.values(machines).map((mach, index, fullArr) => {
          return (
            <View
              key={mach.id}
              className="border border-[#ccc] rounded-md drop-shadow-md p-4 bg-white mb-4">
              <Text className="font-bold text-[20px] text-black">
                {mach.name}
              </Text>
              <View className="mt-4">
                <TextInput
                  label="Category Name"
                  value={mach.name}
                  mode="outlined"
                  onChangeText={text =>
                    dispatch(updateCategory({...mach, name: text}))
                  }
                />
              </View>
              <View>
                {mach.attributes &&
                  Object.values(mach.attributes).map(att => {
                    return (
                      <View className="flex-row items-center">
                        <TextInput
                          value={att.name}
                          mode="outlined"
                          onChangeText={
                            text => dispatch(updateAttributeValue({catID: mach.id, attID: att.id, attValue: text}))
                          }
                          className="flex-1"
                        />
                        <View className="flex-row justify-center items-center">
                          <Text className="pl-4">{att.type.toUpperCase()}</Text>
                          <Button
                            icon="delete"
                            labelStyle={{fontSize: 20, marginHorizontal: 0}}
                            onPress={() => dispatch(deleteAttribute({catID: mach.id, attID: att.id}))}></Button>
                        </View>
                      </View>
                    );
                  })}
              </View>
              {mach.attributes ? (
                <Menu>
                  <MenuTrigger
                    text={`TITLE FIELD: ${mach.title === null ? 'Unspecified' : mach.attributes[mach.title].name}`}
                    style={{
                      backgroundColor: RED,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 12,
                      marginTop: 20,
                    }}
                    customStyles={{
                      triggerText: {
                        color: 'white',
                      },
                    }}
                  />
                  <MenuOptions>
                    {Object.values(mach.attributes).map(att => {
                      return (
                        <MenuOption
                          style={{paddingVertical: 10}}
                          customStyles={{
                            optionText: {
                              color: '#000',
                              fontWeight: '600',
                            },
                          }}
                          key={att.id}
                          onSelect={() => {
                            dispatch(
                              setTitle({catID: mach.id, titleID: att.id}),
                            );
                          }}
                          text={att.name}
                        />
                      );
                    })}
                  </MenuOptions>
                </Menu>
              ) : null}
              <View className="flex-row items-center">
                <Menu>
                  <MenuTrigger
                    text="ADD NEW FIELD"
                    style={{
                      backgroundColor: '#fff',
                      borderWidth: 1,
                      borderColor: RED,
                      borderRadius: 5,
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 12,
                      marginTop: 20,
                    }}
                    customStyles={{
                      triggerText: {
                        color: RED,
                      },
                    }}
                  />
                  <MenuOptions>
                    <MenuOption
                      style={{paddingVertical: 10}}
                      customStyles={{
                        optionText: {
                          color: '#000',
                          fontWeight: '600',
                        },
                      }}
                      onSelect={() => {
                        dispatch(
                          addAttribute({
                            catID: mach.id,
                            attID: `attr-${ mach.attributes && Object.keys(mach.attributes) ?
                              Object.keys(mach.attributes).length + 1 : 0
                            }`,
                            attType: 'text',
                          }),
                        );
                      }}
                      text={'Text'}
                    />
                    <MenuOption
                      style={{paddingVertical: 10}}
                      customStyles={{
                        optionText: {
                          color: '#000',
                          fontWeight: '600',
                        },
                      }}
                      onSelect={() => {
                        dispatch(
                          addAttribute({
                            catID: mach.id,
                            attID: `attr-${ mach.attributes && Object.keys(mach.attributes) ?
                              Object.keys(mach.attributes).length + 1 : 0
                            }`,
                            attType: 'date',
                          }),
                        );
                      }}
                      text={'Date'}
                    />
                    <MenuOption
                      style={{paddingVertical: 10}}
                      customStyles={{
                        optionText: {
                          color: '#000',
                          fontWeight: '600',
                        },
                      }}
                      onSelect={() => {
                        dispatch(
                          addAttribute({
                            catID: mach.id,
                            attID: `attr-${ mach.attributes && Object.keys(mach.attributes) ?
                              Object.keys(mach.attributes).length + 1 : 0
                            }`,
                            attType: 'number',
                          }),
                        );
                      }}
                      text={'Number'}
                    />
                    <MenuOption
                      style={{paddingVertical: 10}}
                      customStyles={{
                        optionText: {
                          color: '#000',
                          fontWeight: '600',
                        },
                      }}
                      onSelect={() => {
                        dispatch(
                          addAttribute({
                            catID: mach.id,
                            attID: `attr-${ mach.attributes && Object.keys(mach.attributes) ?
                              Object.keys(mach.attributes).length + 1 : 0
                            }`,
                            attType: 'checkbox',
                          }),
                        );
                      }}
                      text={'Checkbox'}
                    />
                  </MenuOptions>
                </Menu>

                <Button
                  icon="delete"
                  style={{borderRadius: 5, marginTop: 20, marginLeft: 10}}
                  onPress={() => dispatch(deleteCategory(mach))}>
                  REMOVE
                </Button>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Button
        mode="contained"
        style={{borderRadius: 5, marginTop: 20, margin: 10}}
        onPress={() => {
          dispatch(
            addCategory({
              name: `New Category${
                Object.keys(machines).length === 0
                  ? ''
                  : Object.keys(machines).length + 1
              }`,
              id: `New Category${
                Object.keys(machines).length === 0
                  ? ''
                  : Object.keys(machines).length + 1
              }`,
              title: null,
            }),
          );
        }}>
        ADD NEW CATEGORY
      </Button>
    </>
  );
}
