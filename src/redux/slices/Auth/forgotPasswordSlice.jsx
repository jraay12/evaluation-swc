import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig"

const initialState = {
  data: null,
  error: null,
  status: "idle"
};

export const postForgotPassword = createAsyncThunk(
  "auth/postForgotPassword",
  async (email) => {
      const response = await axios.post("/user/reset-password", email);
      return response.data;
  }
);

const forgotPasswordSlice = createSlice({
  name: "postForgotPassword",
  initialState,
  reducers: {
    ForgotPasswordStatusReset : (state) => {
      state.status = "idle"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postForgotPassword.pending, (state) => {
        state.error = null;
        state.status = "loading"
      })
      .addCase(postForgotPassword.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success'
      })
      .addCase(postForgotPassword.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'fail'
      });
  },
});

export const {ForgotPasswordStatusReset} = forgotPasswordSlice.actions
export default forgotPasswordSlice.reducer
