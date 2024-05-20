import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig";

const initialState = {
  data: null,
  storedData: null,
  error: null,
  status: "idle",
};

export const getUserInformation = createAsyncThunk(
  "user/getUserInformation",
  async (id) => {
    const response = await axios.get(`/user/profile/userId=${id}`);
    return response.data;
  }
);

const userInformationSlice = createSlice({
  name: "getUserInformation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInformation.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(getUserInformation.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(getUserInformation.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "fail";
      });
  },
});


export default userInformationSlice.reducer;
