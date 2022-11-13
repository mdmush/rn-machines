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

      const obj = {
        ...state.machines,
        [catID]: {
          ...state.machines[catID],
          data: {
            ...state.machines[catID].data,
            [itemID]: {
              id: itemID,
              data: {}
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
          title: titleID,
        },
      };
      state.machines = obj;
    },
    addAttribute(state, action) {
      let catID = action.payload.catID;
      let attID = action.payload.attID;
      let attType = action.payload.attType;

      const obj = {
        ...state.machines,
        [catID]: {
          ...state.machines[catID],
          attributes: {
            ...state.machines[catID].attributes,
            [attID]: {
              id: attID,
              name: '',
              type: attType,
            },
          },
        },
      };
      state.machines = obj;
    },
    deleteAttribute(state, action) {
      let catID = action.payload.catID;
      let attID = action.payload.attID;
      delete state.machines[catID].attributes[attID];
    },
    updateAttributeValue(state, action) {
      let catID = action.payload.catID;
      let attID = action.payload.attID;
      let attValue = action.payload.attValue;

      const obj = {
        ...state.machines,
        [catID]: {
          ...state.machines[catID],
          attributes: {
            ...state.machines[catID].attributes,
            [attID]: {
              ...state.machines[catID].attributes[attID],
              name: attValue,
            },
          },
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
  setTitle,
  addAttribute,
  updateAttributeValue,
  deleteAttribute,
} = machinesSlice.actions;
export default machinesSlice.reducer;
