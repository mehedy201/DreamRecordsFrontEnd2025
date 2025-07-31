 import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step: 0,
    signUpFirstStep: null,
    personalDetails: null,
    addressInformation: null,
    labelVerification: null,
    govDocument: null,
    isLoading: false,
    error: null,
};

export const signUpDataHandleSlice = createSlice({
  name: "signUpData",
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload; 
    },
    setSignUpFirstStep: (state, action) => {
      state.signUpFirstStep = action.payload; 
    },
    setPersonalDetails: (state, action) => {
      state.personalDetails = action.payload; // Just store the ID portion
    },
    setAddressInformation: (state, action) => {
      state.addressInformation = action.payload; // Just store the ID portion
    },
    setLabelVerification: (state, action) => {
      state.labelVerification = action.payload; // Just store the ID portion
    },
    setGovDocument: (state, action) => {
      state.govDocument = action.payload; // Just store the ID portion
    },
  },
});

export const {setSignUpFirstStep, setPersonalDetails, setAddressInformation, setLabelVerification, setGovDocument, setStep} = signUpDataHandleSlice.actions;
export default signUpDataHandleSlice.reducer;