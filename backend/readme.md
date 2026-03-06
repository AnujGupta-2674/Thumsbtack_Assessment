# 📚 Book Manager API (Backend)

A RESTful backend for the Book Manager full-stack application. Built with Node.js, Express and MongoDB, it provides authentication and book management endpoints.

---

## 🛠 Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication (jsonwebtoken)
- bcrypt for password hashing
- CORS, cookie-parser, dotenv

---

## 🚀 Setup
1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment variables**
   Create a `.env` file in the `backend/` folder:
   ```
   PORT=8080
   MONGO_URI=<your_mongo_connection_string>
   JWT_SECRET=<your_jwt_secret>
   NODE_ENV=development
   ```

4. **Run the server**
   - Development: `npm run dev` (uses nodemon)
   - Production: `npm start`

   The API will be available at `http://localhost:8080/api/v1/`.

---

## 📁 Directory Structure
```
backend/
├── controllers/       # route handlers
├── models/            # Mongoose schemas
├── routes/            # Express routers
├── middlewares/       # auth & error handling
├── config/            # DB connection
├── validators/        # request validators (currently unused)
└── scripts/           # utility scripts (e.g. seeding)
```

---

## 🔌 API Endpoints

### Authentication
| Method | Path            | Description                          |
|--------|-----------------|--------------------------------------|
| POST   | /signup    | Register a new user                  |
| POST   | /login     | Authenticate user and return JWT     |
| GET    | /me        | Get current user (requires token)    |
| POST   | /logout    | Clear authentication cookie          |

### Books (protected)
| Method | Path              | Description                            |
|--------|-------------------|----------------------------------------|
| GET    | /books            | Get all books for authenticated user   |
| POST   | /books            | Add a new book                         |
| PUT    | /books/:id        | Update book status/details             |
| DELETE | /books/:id        | Delete a book                          |

> Send JWT via `Authorization: Bearer <token>` header or as an HTTP-only cookie.

---

## 🔐 Authentication Flow
1. User signs up or logs in.
2. Server issues a JWT signed with `JWT_SECRET`.
3. Token returned in response and stored in an HTTP-only cookie.
4. Protected routes verify token and attach `req.user`.

---

## 🧪 Seed Data
To populate the database with sample books:
```bash
npm run seed:books
```
The seeder lives in `backend/scripts/` and inserts 20 test records.

---

## ✅ Testing
*(Add test instructions here if tests are added later)*

---

## 🔧 Future Improvements
- Add request validation (Joi/Zod)
- Pagination and filtering for book list
- Image upload for book covers
- Role-based access control

---

Maintained as part of a full‑stack assessment project.

