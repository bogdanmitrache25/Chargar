import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Api } from "../services/Api";

interface IUser {
  id: number;
  name: string;
  email: string;
}

type AuthState = {
  token: string | null;
  user: null | IUser;
  isLogged: boolean;
  isLoading: boolean;
};

const initialState: AuthState = {
  token: null,
  user: null,
  isLogged: false,
  isLoading: false,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: any) => {
    const response = await Api.post("/auth/login", data);
    if (response.statusCode === 200) {
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    }

    throw new Error("Error");
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data: any, thunkApi) => {
    const response = await Api.post("/auth/register", data);

    if (response.statusCode === 201) {
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    }
    return thunkApi.rejectWithValue(response.data);
  }
);

export const logoutUser = () => {
  return {
    type: "auth/logoutUser",
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.isLogged = false;
        state.token = null;
        state.user = null;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogged = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.isLogged = false;
        state.token = null;
        state.user = null;
      });
  },
});

export default authSlice.reducer;
