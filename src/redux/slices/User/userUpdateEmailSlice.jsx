import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig"
import { getUserInformation } from "./userInformationSlice";
const initialState = {
  data: null,
  error: null,
  status: "idle",
};

export const postUpdateUserEmail = createAsyncThunk(
  "user/postUpdateUserEmail",
  async ({ email, id }, {dispatch}) => {
    const response = await axios.post(`/users/update-email/${id}`, email)
    dispatch(getUserInformation(id))
    return response.data;
  }
);

const userUpdateEmailSlice = createSlice({
  name: "postUpdateUserEmail",
  initialState,
  reducers: {
    UpdateEmailResetStatus: (state) => {
      state.status = "idle"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUpdateUserEmail.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(postUpdateUserEmail.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(postUpdateUserEmail.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "fail";
      });
  },
});

export const {UpdateEmailResetStatus} = userUpdateEmailSlice.actions

export default userUpdateEmailSlice.reducer;
