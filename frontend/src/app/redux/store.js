import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import booksReducer from "./slices/books.slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer
  }
});

export default store;