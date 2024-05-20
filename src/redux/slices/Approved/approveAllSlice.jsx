import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/AxiosConfig";

const initialState = {
  data: null,
  error: null,
  status: "idle",
};

export const approveAll = createAsyncThunk("approved/approveAll", async () => {
  const response = await axios.post("/evaluation-form/approve/all");
  return response.data;
});

const approveAllSlice = createSlice({
  name: "approveAll",
  initialState,
  reducers: {
    resetApproveAllStatus(state) {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(approveAll.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })
      .addCase(approveAll.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "success";
      })
      .addCase(approveAll.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "fail";
      });
  },
});

export const { resetApproveAllStatus } = approveAllSlice.actions;
export default approveAllSlice.reducer;
