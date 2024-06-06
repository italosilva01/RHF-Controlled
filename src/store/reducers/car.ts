import { Car } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
const initialState = {} as Car;
const carSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    setCarConsulted: (state, { payload }) => payload,
  },
});

export const { setCarConsulted } = carSlice.actions;
export default carSlice.reducer;
