// dataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "../../../utils/AxiosConfig"

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const getQuestions = createAsyncThunk(
  'question/getQuestions',
  async ({type}) => {
   const response = await axios.get(`/question/get/type=${type}`)
   return response.data
  }
);

const getQuestionsSlice = createSlice({
  name: 'getQuestions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getQuestions.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getQuestions.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(getQuestions.rejected, (state, action) => {
        state.status = "fail";
        state.error = action.error.message;
      });
  },
});

export default getQuestionsSlice.reducer;
