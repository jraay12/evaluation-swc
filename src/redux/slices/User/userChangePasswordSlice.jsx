import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig"

const initialState = {
  data: null,
  error: null,
  status: "idle",
};

export const postChangePassword = createAsyncThunk(
  "user/postChangePassword",
  async ({ value, id }) => {
    const response = await axios.post(`/user/update-password/${id}`, value)
    return response.data;
  }
);

const userChangePasswordSlice = createSlice({
  name: "postChangePassword",
  initialState,
  reducers: {
    ChangePasswordResetStatus: (state) => {
      state.status = "idle"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postChangePassword.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(postChangePassword.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(postChangePassword.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "fail";
      });
  },
});

export const {ChangePasswordResetStatus} = userChangePasswordSlice.actions

export default userChangePasswordSlice.reducer;
