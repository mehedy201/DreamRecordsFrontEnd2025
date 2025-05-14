import { configureStore } from "@reduxjs/toolkit";

import userDataHandleReducer from "./features/userDataHandleSlice/userDataHandleSlice";

const store = configureStore({
    reducer: {
        userData: userDataHandleReducer,
    }
})

export default store;