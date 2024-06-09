import { Brand } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [] as Brand[];
const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    setupBrands: (state, action: PayloadAction<Brand[]>) => action.payload,
  },
});

export const { setupBrands } = brandSlice.actions;
export default brandSlice.reducer;
