// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../../utils/AxiosConfig"
const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const getComments = createAsyncThunk(
  'comments/getComments',
  async () => {
   const response = await axios.get(`/evaluation-form/pending/comment-suggestion`)
   return response.data
  }
);

const pendingApproveSlice = createSlice({
  name: 'getComments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.status = 'fail';
        state.error = action.error.message;
      });
  },
});

export default pendingApproveSlice.reducer;
