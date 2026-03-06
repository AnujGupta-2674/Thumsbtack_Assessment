import express from 'express';
import 'dotenv/config';
import connectDB from './config/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import booksRoutes from './routes/books.routes.js';

const app = express();

const PORT = process.env.PORT || 8080;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(
    {
        origin:'http://localhost:3000',
        credentials:true
    }
));
app.use(cookieParser());

//Routes
app.use("/api/v1/", authRoutes);
app.use("/api/v1/", booksRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});