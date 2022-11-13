import {createSlice} from '@reduxjs/toolkit';

const machinesSlice = createSlice({
  name: 'machines',
  initialState: {
    machines: [],
  },
  reducers: {
    addCategory(state, action) {
      let id = action.payload.id;
      const obj = {
        ...state.machines,
        [id]: action.payload,
      };
      state.machines = obj;
    },
    clearCategories(state, action) {
      state.machines = [];
    },
    updateCategory(state, action) {
      let id = action.payload.id;
      const obj = {
        ...state.machines,
        [id]: action.payload,
      };
      state.machines = obj;
    },
    deleteCategory(state, action) {
      let id = action.payload.id;
      delete state.machines[id];
    },
    addItem(state, action) {
      let catID = action.payload.catID;
      let itemID = action.payload.itemID;
      let itemName = action.payload.itemName;
      let itemValue = action.payload.itemValue;

      const obj = {
        ...state.machines,
        [catID]: {
          ...state.machines[catID],
          data: {
            ...state.machines[catID].data,
            [itemID]: {
              ...state.machines[catID].data[itemID],
              data: {
                ...state.machines[catID].data[itemID].data,
                [itemName]: {
                  ...state.machines[catID].data[itemID].data[itemName],
                  value: itemValue,
                },
              },
            },
          },
        },
      };
      state.machines = obj;
    },
    updateItem(state, action) {
      let catID = action.payload.catID;
      let itemID = action.payload.itemID;
      let itemName = action.payload.itemName;
      let itemValue = action.payload.itemValue;

      const obj = {
        ...state.machines,
        [catID]: {
          ...state.machines[catID],
          data: {
            ...state.machines[catID].data,
            [itemID]: {
              ...state.machines[catID].data[itemID],
              data: {
                ...state.machines[catID].data[itemID].data,
                [itemName]: {
                  ...state.machines[catID].data[itemID].data[itemName],
                  value: itemValue,
                },
              },
            },
          },
        },
      };
      state.machines = obj;
    },
    deleteItem(state, action) {
      let catID = action.payload.catID;
      let itemID = action.payload.itemID;
      delete state.machines[catID].data[itemID];
    },
    setTitle(state, action) {
      let catID = action.payload.catID;
      let titleID = action.payload.titleID;

      const obj = {
        ...state.machines,
        [catID]: {
          ...state.machines[catID],
          title: titleID
        },
      };
      state.machines = obj;
    },
  },
});

export const {
  addCategory,
  clearCategories,
  updateCategory,
  deleteCategory,
  addItem,
  updateItem,
  deleteItem,
  setTitle
} = machinesSlice.actions;
export default machinesSlice.reducer;
