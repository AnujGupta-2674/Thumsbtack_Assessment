import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true
    },

    author: {
        type: String,
        trim: true
    },

    tags: {
        type: [String],
        default: []
    },

    status: {
        type: String,
        enum: ["want_to_read", "reading", "completed"],
        default: "want_to_read"
    }
}, { timestamps: true }
);


const Book = mongoose.model("Book", bookSchema);

export default Book;