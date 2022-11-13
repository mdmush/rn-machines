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
  setMachines,
  setTitle,
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
              {/* <Button
                mode="contained"
                style={{borderRadius: 5, marginTop: 20}}
                onPress={() => console.log('Pressed')}>
                TITLE FIELD: MODEL
              </Button> */}
              <Menu>
                <MenuTrigger text={`TITLE FIELD: ${mach.attributes[mach.title].name}`} customStyles={{color: '#fff'}} style={{backgroundColor: RED, borderRadius: 5, justifyContent: 'center', alignItems: 'center', paddingVertical: 12, marginTop: 20}} />
                <MenuOptions>
                  {Object.values(mach.attributes).map((att) => {
                    return(
                      <MenuOption style={{paddingVertical: 10}} customStyles={{color: '#fff'}} key={att.id} onSelect={() => {
                        dispatch(setTitle({catID: mach.id, titleID: att.id}))
                      }} text={att.name} />
                    )
                  })}
                </MenuOptions>
              </Menu>
              <View className="flex-row items-center">
                <Button
                  mode="outlined"
                  style={{
                    borderRadius: 5,
                    marginTop: 20,
                    borderColor: '#cb2030',
                  }}
                  onPress={() => {
                    visible = true;
                  }}>
                  ADD NEW FIELD
                </Button>

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
              title: 'attr-1',
              attributes: {
                'attr-1': {
                  id: 'attr-1',
                  name: 'Model',
                  type: 'text',
                },
                'attr-2': {
                  id: 'attr-2',
                  name: 'Purchased On?',
                  type: 'date',
                },
                'attr-3': {
                  id: 'attr-3',
                  name: 'Weight',
                  type: 'number',
                },
                'attr-4': {
                  id: 'attr-4',
                  name: 'Does it Work?',
                  type: 'checkbox',
                },
              },
              data: {
                'data-1': {
                  id: 'data-1',
                  data: {
                    Model: {
                      type: 'attr-1',
                      name: 'Model',
                      value: '',
                    },
                    'Purchased On?': {
                      type: 'attr-2',
                      name: 'Purchased On?',
                      value: '',
                    },
                    Weight: {
                      type: 'attr-3',
                      name: 'Weight',
                      value: '',
                    },
                    'Does it Work?': {
                      type: 'attr-4',
                      name: 'Does it Work?',
                      value: '',
                    },
                  },
                },
              },
            }),
          );
        }}>
        ADD NEW CATEGORY
      </Button>
    </>
  );
}
