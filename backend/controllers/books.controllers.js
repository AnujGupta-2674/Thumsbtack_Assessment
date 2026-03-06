import Book from "../models/book.model.js";

/**
 * Get books for the authenticated user
 *
 * Supports optional filtering by reading status
 *
 * @route   GET /books
 * @access  Private
 *
 * Query Params:
 * @param {string} [req.query.status] - Filter books by status
 *                                      (want_to_read | reading | completed)
 *
 * @returns {Object} 200 - List of user's books
 * @returns {Object} 500 - Internal server error
 */
export const getBooks = async (req, res) => {
    try {
        // Extract optional status filter from query params
        const { status } = req.query;

        // Get authenticated user id from middleware
        const userId = req.user._id;

        /**
         * Build dynamic filter object
         * If status exists → include it
         * Otherwise fetch all books for the user
         */
        const filter = {
            userId,
            ...(status && { status })
        };

        // Fetch books from database
        const books = await Book.find(filter)
            .sort({ createdAt: -1 }) // newest books first
            .lean();

        return res.status(200).json({
            message: "Books fetched successfully",
            count: books.length,
            books
        });

    } catch (error) {
        console.error("Get books error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/**
 * Create a new book
 *
 * @route POST /books
 * @access Private
 */
export const createBook = async (req, res) => {
    try {

        const { title, author } = req.body;

        if (!title || !author) {
            return res.status(400).json({
                message: "Title and author are required"
            });
        }

        const book = await Book.create({
            title,
            author,
            status: "want_to_read",
            userId: req.user._id
        });

        return res.status(201).json({
            message: "Book added successfully",
            book
        });

    } catch (error) {

        console.error("Create book error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });

    }
};

/**
 * Update an existing book
 *
 * @route   PATCH /books/:id
 * @access  Private
 *
 * @param {string} req.params.id - Book ID
 * @body {string} [title] - Updated book title
 * @body {string} [author] - Updated author name
 * @body {Array<string>} [tags] - Updated tags
 * @body {string} [status] - Updated reading status
 *
 * @returns {Object} 200 - Updated book document
 * @returns {Object} 404 - Book not found
 * @returns {Object} 500 - Internal server error
 */
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const { title, author, tags, status } = req.body;

        // Build dynamic update object
        const updateData = {
            ...(title && { title }),
            ...(author && { author }),
            ...(tags && { tags }),
            ...(status && { status })
        };

        // Prevent empty updates
        if (!Object.keys(updateData).length) {
            return res.status(400).json({
                message: "No fields provided to update"
            });
        }

        // Update book using $set
        const updatedBook = await Book.findOneAndUpdate(
            { _id: id, userId },
            { $set: updateData },
            { new: true }
        ).lean();

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        return res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        });

    } catch (error) {
        console.error("Update book error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

/**
 * Delete a book
 *
 * @route   DELETE /books/:id
 * @access  Private
 *
 * @param {string} req.params.id - Book ID
 *
 * @returns {Object} 200 - Book deleted successfully
 * @returns {Object} 404 - Book not found
 * @returns {Object} 500 - Internal server error
 */
export const deleteBook = async (req, res) => {
    try {
        // Extract book id from request params
        const { id } = req.params;

        // Get authenticated user id from middleware
        const userId = req.user._id;

        // Find and delete book belonging to the authenticated user
        const deletedBook = await Book.findOneAndDelete({
            _id: id,
            userId
        });

        // If book does not exist
        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        return res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        console.error("Delete book error:", error);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
};