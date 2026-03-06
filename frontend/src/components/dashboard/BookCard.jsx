"use client";

import { MoreVertical } from "lucide-react";
import { useDispatch } from "react-redux";

import { deleteBook, updateBook } from "../../app/redux/actions/books.actions.js";

export default function BookCard({ book }) {

    const dispatch = useDispatch();

    return (
        <div className="border rounded-lg p-4 flex justify-between items-center">

            <div>
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-muted-foreground">{book.author}</p>
            </div>

            <div className="relative group">

                <MoreVertical className="cursor-pointer" />

                <div className="absolute right-0 hidden group-hover:block bg-white border rounded-md shadow-md w-40">

                    <button
                        onClick={() =>
                            dispatch(updateBook({ id: book._id, data: { status: "reading" } }))
                        }
                        className="block w-full text-left px-3 py-2 hover:bg-muted"
                    >
                        Move to Reading
                    </button>

                    <button
                        onClick={() =>
                            dispatch(updateBook({ id: book._id, data: { status: "completed" } }))
                        }
                        className="block w-full text-left px-3 py-2 hover:bg-muted"
                    >
                        Mark Completed
                    </button>

                    <button
                        onClick={() => dispatch(deleteBook(book._id))}
                        className="block w-full text-left px-3 py-2 text-red-500 hover:bg-muted"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}