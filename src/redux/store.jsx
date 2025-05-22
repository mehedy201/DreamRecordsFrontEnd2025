import { configureStore } from "@reduxjs/toolkit";

import userDataHandleReducer from "./features/userDataHandleSlice/userDataHandleSlice";
import yearsAndStatusList from './features/yearList&statusListSlice/yearList&statusListSlice'

const store = configureStore({
    reducer: {
        userData: userDataHandleReducer,
        yearsAndStatus: yearsAndStatusList,
    }
})

export default store;