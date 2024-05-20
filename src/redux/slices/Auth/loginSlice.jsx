import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig"

const initialState = {
  data: null,
  error: null,
  status: "idle"
};

export const postLogin = createAsyncThunk(
  "auth/postLogin",
  async (credentials) => {
    
      const response = await axios.post("/login", credentials);
      return response.data;
    
  }
);

const loginSlice = createSlice({
  name: "postLogin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLogin.pending, (state) => {
        state.error = null;
        state.status = "loading"
      })
      .addCase(postLogin.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = 'success'
      })
      .addCase(postLogin.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = 'fail'
      });
  },
});

export default loginSlice.reducer
