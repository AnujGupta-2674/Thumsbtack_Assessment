"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

import { fetchUser } from "../redux/actions/auth.actions.js";
import { fetchBooks } from "../redux/actions/books.actions.js";

import Navbar from "../../components/dashboard/Navbar.jsx";
import AddBookForm from "../../components/dashboard/AddBookForm.jsx";
import BooksTabs from "../../components/dashboard/BooksTabs.jsx";

export default function DashboardPage() {

  const dispatch = useDispatch();
  const router = useRouter();

  const [status, setStatus] = useState("want_to_read");

  /**
   * Protect dashboard route
   */
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    dispatch(fetchUser());

  }, [dispatch, router]);

  /**
   * Fetch books when tab changes
   */
  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      dispatch(fetchBooks(status));
    }

  }, [status, dispatch]);

  return (
    <div className="min-h-screen bg-muted/30">

      <Navbar />

      <div className="max-w-5xl mx-auto p-6 space-y-6">

        <AddBookForm />

        <BooksTabs status={status} setStatus={setStatus} />

      </div>

    </div>
  );
}