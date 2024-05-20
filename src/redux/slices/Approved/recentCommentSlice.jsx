// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../../utils/AxiosConfig"
const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const recentComment = createAsyncThunk(
  'aprroved/recentComment',
  async () => {
   const response = await axios.get(`/evaluation-form/recent-approved/comment-suggestion`)
   return response.data
  }
);

const recentCommentSlice = createSlice({
  name: 'recentComment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(recentComment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(recentComment.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(recentComment.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default recentCommentSlice.reducer;
