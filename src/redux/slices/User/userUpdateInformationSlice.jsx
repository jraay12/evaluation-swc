import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig";
import { getUserInformation } from "./userInformationSlice";
const initialState = {
  data: null,
  error: null,
  status: "idle",
};

export const postUpdateUserInformation = createAsyncThunk(
  "user/postUpdateUserInformation",
  async ({ value, id }, {dispatch}) => {
    const response = await axios.post(`/user/updateprofile/${id}`, value)
    dispatch(getUserInformation(id))
    return response.data;
  }
);

const userUpdateInformationSlice = createSlice({
  name: "postUpdateUserInformation",
  initialState,
  reducers: {
    UpdateInformationResetStatus: (state) => {
      state.status = "idle"
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUpdateUserInformation.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(postUpdateUserInformation.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(postUpdateUserInformation.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "fail";
      });
  },
});

export const {UpdateInformationResetStatus} = userUpdateInformationSlice.actions

export default userUpdateInformationSlice.reducer;
