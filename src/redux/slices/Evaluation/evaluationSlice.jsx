import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig";

const initialState = {
  data: null,
  error: null,
  status: "idle",
};

export const postEvaluation = createAsyncThunk(
  "evaluation/postEvaluation",
  async (data) => {
   try {
    const response = await axios.post("/evaluation-result/create", data);
    return response.data;
   } catch (error) {
    console.log(error)
   }
  }
);

const evaluationSlice = createSlice({
  name: "postEvaluation",
  initialState,
  reducers: {
    ResetEvaluatedStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postEvaluation.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(postEvaluation.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(postEvaluation.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "fail";
      });
  },
});

export const { ResetEvaluatedStatus } = evaluationSlice.actions;
export default evaluationSlice.reducer;
