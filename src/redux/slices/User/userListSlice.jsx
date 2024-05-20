import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig"

const initialState = {
  data: null,
  error: null,
  status : "idle"
};

export const getUserList = createAsyncThunk(
  "user/getUserList",
  async ({type}) => {
      const response = await axios.get(`/get-user/role=${type}`);
      return response.data;
   
  }
);

const userListSlice = createSlice({
  name: "getUserList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserList.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUserList.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      })
      .addCase(getUserList.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default userListSlice.reducer;
