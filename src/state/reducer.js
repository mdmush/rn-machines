export const initialState = {
  machines: [],
};

export const actionTypes = {
  SET_MACHINE: 'SET_MACHINE',
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MACHINE:
      return {
        ...state,
        machines: [...state.machines, action.payload],
      };

    default:
      return state;
  }
};
