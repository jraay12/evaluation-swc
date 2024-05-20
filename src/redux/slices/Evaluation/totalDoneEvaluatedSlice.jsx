// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../../utils/AxiosConfig"
const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const getTotalDoneEvaluation = createAsyncThunk(
  'evaluated/getTotalDoneEvaluation',
  async () => {
   const response = await axios.get(`/total/users-evaluated`)
   return response.data
  }
);

const totalDoneEvaluatedSlice = createSlice({
  name: 'getTotalDoneEvaluation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTotalDoneEvaluation.pending, (state) => {
        state.status ="loading";
        state.error = null;
      })
      .addCase(getTotalDoneEvaluation.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getTotalDoneEvaluation.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default totalDoneEvaluatedSlice.reducer;
