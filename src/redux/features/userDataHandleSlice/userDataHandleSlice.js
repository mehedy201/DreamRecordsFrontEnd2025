import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  isLoading: false,
  error: null,
};

export const userDataHandleSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload; 
    },
    clearUserData: (state) => {
      state.userData = null; 
    },
  },
});

export const {setUserData, clearUserData} = userDataHandleSlice.actions;
export default userDataHandleSlice.reducer;
