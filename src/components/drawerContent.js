import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {useDispatch, useSelector} from 'react-redux';

export default function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const {machines} = useSelector(state => state.machines);
  
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <DrawerItem
        key="dashboard"
        focused={props.state.index === 0}
        label="Dashboard"
        onPress={() => props.navigation.navigate('dashboard')}
      />
      {Object.values(machines).map((mach, index) => {
        return (
          <DrawerItem key={index} label={mach.name} onPress={() => props.navigation.navigate('category', {data: mach})} />
        );
      })}
      <DrawerItem
        key="managecategories"
        focused={props.state.index === 2}
        label="Manage Categories"
        onPress={() => props.navigation.navigate('managecategories')}
      />
    </DrawerContentScrollView>
  );
}
