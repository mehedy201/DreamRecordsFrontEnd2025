import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  releaseAlbumInfo: [],
  tracksInfo: [],
  singleTrackInfo: [],
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
    setSingleTrackInfo: (state, action) => {
      state.singleTrackInfo = action.payload; 
    },
    setTracksInfo: (state, action) => {
      state.tracksInfo = action.payload; 
    },
  },
});

export const {setReleaseAlbumInfo, setSingleTrackInfo, setTracksInfo} = releaseDataHandleSlice.actions;
export default releaseDataHandleSlice.reducer;
