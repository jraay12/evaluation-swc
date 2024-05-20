// dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig";
const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const pieChart = createAsyncThunk(
  "chart/pieChart",
  async ({ id, type }) => {
    const response = await axios.get(
      `/question-description/rating-total/?type=${type}&userid=${id}`
    );
    return response.data;
  }
);

const pieChartSlice = createSlice({
  name: "pieChart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(pieChart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(pieChart.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(pieChart.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default pieChartSlice.reducer;
