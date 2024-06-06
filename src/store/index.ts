import { configureStore } from "@reduxjs/toolkit";

import carSlice from "./reducers/car";
import brandsSlice from "./reducers/brands";
const store = configureStore({
  reducer: {
    car: carSlice,
    brands: brandsSlice,
  },
});

export default store;
