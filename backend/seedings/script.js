import mongoose from "mongoose";
import Book from "../models/book.model.js";
import 'dotenv/config';

const USER_ID = "your_user_id_here";

const books = [
  { title: "Atomic Habits", author: "James Clear", status: "reading" },
  { title: "Deep Work", author: "Cal Newport", status: "want_to_read" },
  { title: "The Psychology of Money", author: "Morgan Housel", status: "completed" },
  { title: "The Alchemist", author: "Paulo Coelho", status: "completed" },
  { title: "Rich Dad Poor Dad", author: "Robert Kiyosaki", status: "reading" },
  { title: "Think and Grow Rich", author: "Napoleon Hill", status: "want_to_read" },
  { title: "The Subtle Art of Not Giving a F*ck", author: "Mark Manson", status: "completed" },
  { title: "Ikigai", author: "Hector Garcia", status: "reading" },
  { title: "Start With Why", author: "Simon Sinek", status: "want_to_read" },
  { title: "The 7 Habits of Highly Effective People", author: "Stephen Covey", status: "reading" },
  { title: "Can't Hurt Me", author: "David Goggins", status: "completed" },
  { title: "Zero to One", author: "Peter Thiel", status: "want_to_read" },
  { title: "The Lean Startup", author: "Eric Ries", status: "reading" },
  { title: "Hooked", author: "Nir Eyal", status: "want_to_read" },
  { title: "The Power of Habit", author: "Charles Duhigg", status: "completed" },
  { title: "Thinking Fast and Slow", author: "Daniel Kahneman", status: "reading" },
  { title: "The Compound Effect", author: "Darren Hardy", status: "completed" },
  { title: "The Millionaire Fastlane", author: "MJ DeMarco", status: "want_to_read" },
  { title: "The Courage to Be Disliked", author: "Ichiro Kishimi", status: "reading" },
  { title: "Meditations", author: "Marcus Aurelius", status: "completed" }
].map(book => ({
  ...book,
  userId: new mongoose.Types.ObjectId(USER_ID)
}));

async function seedBooks() {
  try {

    await mongoose.connect(process.env.MONGO_URI);

    await Book.deleteMany({ userId: USER_ID });

    await Book.insertMany(books);

    console.log("✅ 20 books seeded successfully");

    process.exit();

  } catch (error) {

    console.error(error);
    process.exit(1);

  }
}

seedBooks();