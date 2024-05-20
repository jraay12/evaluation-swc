// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../../utils/AxiosConfig"
const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const getOfficeList = createAsyncThunk(
  'office/getOfficeList',
  async () => {
   const response = await axios.get(`/get/office-services`)
   return response.data
  }
);

const officeListSlice = createSlice({
  name: 'getOfficeList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOfficeList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getOfficeList.fulfilled, (state, action) => {
        state.status = "pending";
        state.data = action.payload;
      })
      .addCase(getOfficeList.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.error.message;
      });
  },
});

export default officeListSlice.reducer;
