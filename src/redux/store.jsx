import { configureStore } from "@reduxjs/toolkit";

import userDataHandleReducer from "./features/userDataHandleSlice/userDataHandleSlice";
import yearsAndStatusList from './features/yearList&statusListSlice/yearList&statusListSlice';
import releaseDataHandleReducer from './features/releaseDataHandleSlice/releaseDataHandleSlice';
import reFetchDataHandleSlice from "./features/reFetchDataHandleSlice/reFetchDataHandleSlice";

const store = configureStore({
    reducer: {
        userData: userDataHandleReducer,
        yearsAndStatus: yearsAndStatusList,
        releaseData: releaseDataHandleReducer,
        reFetchSlice: reFetchDataHandleSlice,
    }
})

export default store;