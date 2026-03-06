import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, fetchUser, logoutUser } from "../actions/auth.actions";

const initialState = {
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // fetch user
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export default authSlice.reducer;