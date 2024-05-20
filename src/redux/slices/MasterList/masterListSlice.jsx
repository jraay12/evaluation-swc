// dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig";
const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const getMasterList = createAsyncThunk(
  "masterList/getMasterList",
  async ({ type }) => {
    const response = await axios.get(
      `/evaluation/masterlist?evaluationType=${type}`
    );
    return response.data;
  }
);

const masterListSlice = createSlice({
  name: "getMasterList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMasterList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMasterList.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getMasterList.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default masterListSlice.reducer;
