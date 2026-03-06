import { Router } from 'express';
import * as booksControllers from '../controllers/books.controllers.js'
import { protectRoute } from '../middlewares/auth.middleware.js';

const router = Router();

router.get("/books", protectRoute, booksControllers.getBooks);
router.post("/books", protectRoute, booksControllers.createBook);
router.put('/books/:id', protectRoute, booksControllers.updateBook);
router.delete("/books/:id", protectRoute, booksControllers.deleteBook);

export default router;