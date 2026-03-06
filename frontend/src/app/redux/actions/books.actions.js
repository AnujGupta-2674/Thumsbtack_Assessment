import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "./api";

/**
 * Get books
 */
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async (status, { rejectWithValue }) => {
    try {
      const url = status ? `/books?status=${status}` : "/books";

      const token = localStorage.getItem("token");

      const response = await API.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data.books;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Add new book
 */
export const addBook = createAsyncThunk(
  "books/addBook",
  async (data, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.post("/books", data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data.book;

    } catch (error) {

      return rejectWithValue(error.response.data);

    }
  }
);

/**
 * Update book
 */
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.put(`/books/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data.book;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * Delete book
 */
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await API.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);