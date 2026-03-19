import { configureStore } from "@reduxjs/toolkit";
import catalogReducer from "./catalogSlice";
import reviewReducer from "./reviewSlice";


export const store = configureStore({
  reducer: {
    catalog: catalogReducer,  
    reviews: reviewReducer,   
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
