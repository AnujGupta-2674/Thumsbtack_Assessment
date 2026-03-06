import { createSlice } from "@reduxjs/toolkit";
import { fetchBooks, updateBook, deleteBook,addBook } from "../actions/books.actions";

const initialState = {
  books: [],
  loading: false,
  error: null
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })

      .addCase(addBook.fulfilled, (state, action) => {
        state.books.unshift(action.payload);
      })

      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.books.findIndex(
          book => book._id === action.payload._id
        );

        if (index !== -1) {
          state.books[index] = action.payload;
        }
      })

      .addCase(deleteBook.fulfilled, (state, action) => {
        state.books = state.books.filter(
          book => book._id !== action.payload
        );
      });
  }
});

export default booksSlice.reducer;