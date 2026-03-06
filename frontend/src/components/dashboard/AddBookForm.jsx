"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";

import { addBook } from "../../app/redux/actions/books.actions.js";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddBookForm() {

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    title: "",
    author: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addBook(form));

    setForm({ title: "", author: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-3"
    >

      <Input
        name="title"
        placeholder="Book title"
        value={form.title}
        onChange={handleChange}
        required
      />

      <Input
        name="author"
        placeholder="Author"
        value={form.author}
        onChange={handleChange}
        required
      />

      <Button>Add Book</Button>

    </form>
  );
}