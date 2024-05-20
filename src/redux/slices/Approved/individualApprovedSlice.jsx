import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig";

const initialState = {
  data: null,
  error: null,
  status: "idle",
};

export const approveIndividual = createAsyncThunk(
  "comments/approveIndividual",
  async ({ id }) => {
    const response = await axios.post(`/evaluation-form/approve/${id}`);
    return response.data;
  }
);

const individualApprovedSlice = createSlice({
  name: "approveIndividual",
  initialState,
  reducers: {
    resetStatusForIndividual(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(approveIndividual.pending, (state) => {
        
        state.error = null;
        state.status = "loading";
      })
      .addCase(approveIndividual.fulfilled, (state, action) => {
       
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(approveIndividual.rejected, (state, action) => {
      
        state.error = action.error.message;
        state.status = "fail";
      });
  },
});

export const { resetStatusForIndividual } = individualApprovedSlice.actions;
export default individualApprovedSlice.reducer;
