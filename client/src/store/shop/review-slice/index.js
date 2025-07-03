import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  reviews: [],
};

export const addReview = createAsyncThunk(
  "/order/addReview",
  async (formdata, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/shop/review/add",
        formdata
      );
      return response.data;
    } catch (err) {
      // Forward the error message to the reducer
      return rejectWithValue(err.response?.data || { message: "Unknown error" });
    }
  }
);

export const getReviews = createAsyncThunk("/order/getReviews", async (id) => {
  const response = await axios.get(
    `http://localhost:5000/api/shop/review/${id}`
  );

  return response.data;
});

const reviewSlice = createSlice({
  name: "reviewSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      })
      // Handle addReview rejected
      .addCase(addReview.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.isLoading = false;
        // You can add more logic here if needed
      })
      .addCase(addReview.rejected, (state, action) => {
        state.isLoading = false;
        console.error("Failed to add review:", action.payload?.message || action.error.message);
        // Optionally, you can show some toast notification or error UI
      });
  },
});

export default reviewSlice.reducer;
