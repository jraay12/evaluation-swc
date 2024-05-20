// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../../utils/AxiosConfig"
const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const notYetEvaluated = createAsyncThunk(
  'evaluated/notYetEvaluated',
  async () => {
   const response = await axios.get(`/users/not-evaluated/status=1`)
   return response.data
  }
);

const notYetEvaluatedSlice = createSlice({
  name: 'notYetEvaluated',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(notYetEvaluated.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(notYetEvaluated.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(notYetEvaluated.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default notYetEvaluatedSlice.reducer;
