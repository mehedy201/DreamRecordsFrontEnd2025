import { configureStore } from "@reduxjs/toolkit";

import userDataHandleReducer from "./features/userDataHandleSlice/userDataHandleSlice";
import yearsAndStatusList from './features/yearList&statusListSlice/yearList&statusListSlice';
import releaseDataHandleReducer from './features/releaseDataHandleSlice/releaseDataHandleSlice'

const store = configureStore({
    reducer: {
        userData: userDataHandleReducer,
        yearsAndStatus: yearsAndStatusList,
        releaseData: releaseDataHandleReducer,
    }
})

export default store;