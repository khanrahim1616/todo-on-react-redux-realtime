import * as types from "./type";

export const getInputValue = (payload) => {
  return {
    type: types.GET_DATA,
    payload,
  };
};

export const editData = (payload) => {
  return {
    type: types.EDIT_DATA,
    payload,
  };
};

export const updateData = () => {
  return {
    type: types.UPDATE_DATA,
  };
};

export const getUserUid = (payload) => {
  return {
    type: types.FIREBASE_UID,
    payload,
  };
};

export const canelEdit = () => {
  return {
    type: types.CANCEL_EDIT,
  };
};

export const getFirebaseData = (payload) => {
  const data = Object.values(payload);
  // const newData=Object.keys(payload)
  // console.log(newData)
  const list = data[0].list;
  const username = data[0].username;

  return {
    type: types.FIREBASE_DATA,
    payload: {
      list: list,
      username: username,
    },
  };
};
