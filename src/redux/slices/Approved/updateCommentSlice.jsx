import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig";

const initialState = {
  data: null,
  error: null,
  status: "idle",
};

export const postUpdateComment = createAsyncThunk(
  "comments/postUpdateComment",
  async ({ id, data }) => {
    const response = await axios.post(`/evaluation-form/update/${id}`, data);
    return response.data;
  }
);

const updateCommentSlice = createSlice({
  name: "postUpdateComment",
  initialState,
  reducers: {
    resetUpdateCommentStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUpdateComment.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(postUpdateComment.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(postUpdateComment.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "fail";
      });
  },
});

export const { resetUpdateCommentStatus } = updateCommentSlice.actions;
export default updateCommentSlice.reducer;
