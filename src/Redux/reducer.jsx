import * as types from "./type";
const initialstate = {
  input: "",
  list: [],
  index: false,
  username: false,
  uid: false,
  loading: true,
};

const reducer = (state = initialstate, action) => {
  switch (action.type) {
    case types.GET_DATA:
      const inputValue = action.payload;
      return {
        ...state,
        input: inputValue,
      };

    case types.EDIT_DATA:
      return {
        ...state,
        input: state.list[action.payload],
        index: action.payload,
      };

    case types.UPDATE_DATA:
      return {
        ...state,
        index: false,
        input: "",
      };

    case types.CANCEL_EDIT:
      return {
        ...state,
        index: false,
        input: "",
      };

    case types.FIREBASE_DATA:
      return {
        ...state,
        list: action.payload.list || [],
        username: action.payload.username,
        input: "",
        loading: false,
      };

    case types.FIREBASE_UID:
      return {
        ...state,
        uid: action.payload,
      };
    case types.SET_LOADING:
      return {
        loading: action.payload,
        uid: false,
        index: false,
      };
    default:
      return state;
  }
};

export default reducer;
