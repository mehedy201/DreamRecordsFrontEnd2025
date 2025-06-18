import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  releaseAlbumInfo: [],
  secondStep: [],
  isLoading: false,
  error: null,
};

export const releaseDataHandleSlice = createSlice({
  name: "releaseData",
  initialState,
  reducers: {
    setReleaseAlbumInfo: (state, action) => {
      state.releaseAlbumInfo = action.payload; 
    },
  },
});

export const {setReleaseAlbumInfo} = releaseDataHandleSlice.actions;
export default releaseDataHandleSlice.reducer;
