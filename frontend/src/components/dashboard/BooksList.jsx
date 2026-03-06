"use client";

import { useSelector } from "react-redux";
import BookCard from "./BookCard";

export default function BooksList({ status }) {

  const { books, loading } = useSelector((state) => state.books);

  const filteredBooks = books.filter(book => book.status === status);

  if (loading) {
    return <p className="mt-4 text-muted-foreground">Loading books...</p>;
  }

  if (filteredBooks.length === 0) {
    return (
      <p className="mt-4 text-muted-foreground">
        No books in this section.
      </p>
    );
  }

  return (
    <div className="space-y-3 mt-4">

      {filteredBooks.map((book) => (
        <BookCard key={book._id} book={book} />
      ))}

    </div>
  );
}