import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Flag } from "lucide-react";


const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",

  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/login",
      formData,
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const logOutUser = createAsyncThunk(
  "/auth/logout",

  async () => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/logout",
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  }
);

export const cheakAuth = createAsyncThunk(
  "/auth/cheakauth",

  async () => {
    const response = await axios.get(
      "http://localhost:5000/api/auth/cheak-auth",

      {
        withCredentials:true,
        headers:{
          "Cache-Control" : "no-store, no-cache, must-revalidate , proxy-revalidate",
         

        }
      }
     
    );

    return response.data;
  }
);



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }).addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success?  action.payload.user:null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      }).addCase(cheakAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cheakAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.success?  action.payload.user:null;
        state.isAuthenticated = action.payload.success;
      })
      .addCase(cheakAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })
      
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;