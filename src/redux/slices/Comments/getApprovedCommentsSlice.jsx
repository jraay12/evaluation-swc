// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../../utils/AxiosConfig"
const initialState = {
  data: [],
  error: null,
  status: "idle"
};

export const getApprovedComments = createAsyncThunk(
  'comments/getApprovedComments',
  async ({id}) => {
   const response = await axios.get(`/list-approved/userid=${id}`)
   return response.data
  }
);

const getApprovedCommentsSlice = createSlice({
  name: 'getApprovedComments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getApprovedComments.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getApprovedComments.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getApprovedComments.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default getApprovedCommentsSlice.reducer;
