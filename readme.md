# 📚 Book Manager Full-Stack Application

This repository contains a complete **Book Manager** application with separate frontend and backend directories. The frontend is built using Next.js while the backend uses Express and MongoDB. The system allows users to sign up/login, manage a reading list, and update book statuses.

---

## 📁 Repository Structure
\`\`\`
/ (root)
├── backend/         # Express API, authentication, book CRUD
├── frontend/        # Next.js client with Redux state
└── readme.md        # This file (overview & setup instructions)
\`\`\`

---
# 📚 Book Manager API (Backend)

A RESTful backend for the Book Manager full-stack application. Built with Node.js, Express and MongoDB, it provides authentication and book 

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
| POST   | /auth/signup    | Register a new user                  |
| POST   | /auth/login     | Authenticate user and return JWT     |
| GET    | /auth/me        | Get current user (requires token)    |
| POST   | /auth/logout    | Clear authentication cookie          |

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

EOF

Ran terminal command:  cat <<'EOF' > /Users/anuj_gupta04/Thumsbtack_Assessment/frontend/README.md
# 📚 Book Manager Frontend

Client application for the Book Manager project. It is built with Next.js and communicates with the backend API to provide user authentication and book management features.

---

## 🛠 Tech Stack
- Next.js (App Router)
- React & Hooks
- Redux Toolkit (slices & thunks)
- Tailwind CSS
- ShadCN UI components
- Lucide Icons
- React Toastify
- Axios for HTTP requests

---

## 🚀 Setup
1. **Change to the frontend folder**
   ```bash
   cd frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Environment variables**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```
   - This URL should point to whichever host the backend is running on.
4. **Run in development mode**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.
5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 🔧 Project Structure
```
frontend/
├── app/               # Next.js pages and layouts (login, signup, dashboard)
├── components/        # shared UI components
├── redux/             # store setup, slices, api services
├── public/            # static assets
└── styles/            # global styles and tails
```

---

## ✨ Features
- User signup, login, and logout
- JWT-based authentication with protected routes
- Dashboard with book list and status tabs
- Add, update, and delete books
- Status categories: Want To Read / Reading / Completed
- Responsive design using Tailwind + ShadCN UI

---

## 📡 API Interaction
The frontend uses Redux async thunks to call backend endpoints defined in the `NEXT_PUBLIC_API_URL`. Responses update the Redux store, triggering UI updates. Authentication tokens are sent automatically via an HTTP-only cookie.

---

## 🧠 State Management
Redux Toolkit handles:
- Authentication state
- Books state
- Async loading/error states

Slices are defined under `frontend/redux/` and wired in `store.js`.

---

## 📝 Notes
- Ensure the backend server is running and `NEXT_PUBLIC_API_URL` is correct.
- Login status persists in local storage and cookies.
- Protected routes redirect unauthenticated users back to login.

---

## 🚢 Deployment
- Deploy to Vercel, Netlify, or any static hosting service.
- Set `NEXT_PUBLIC_API_URL` to the production backend URL.
- Run `npm run build` during deployment.

---

## 📌 Future Enhancements
- Add search, filter, and pagination
- Drag‑and‑drop book status changes
- Dark mode support
- User profile pages

---

Created as part of a full-stack assessment exercise.

EOF

User: Now rewrite the frontend readme for me

GitHub Copilot: Ran terminal command:  cat <<'EOF' > /Users/anuj_gupta04/Thumsbtack_Assessment/frontend/README.md
# 📚 Book Manager Frontend

Client application for the Book Manager project. It is built with Next.js and communicates with the backend API to provide user authentication and book management features.

---

## 🛠 Tech Stack
- Next.js (App Router)
- React & Hooks
- Redux Toolkit (slices & thunks)
- Tailwind CSS
- ShadCN UI components
- Lucide Icons
- React Toastify
- Axios for HTTP requests

---

## 🚀 Setup
1. **Change to the frontend folder**
   ```bash
   cd frontend
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Environment variables**
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
   ```
   - This URL should point to whichever host the backend is running on.
4. **Run in development mode**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the app.
5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

---

## 🔧 Project Structure
```
frontend/
├── app/               # Next.js pages and layouts (login, signup, dashboard)
├── components/        # shared UI components
├── redux/             # store setup, slices, api services
├── public/            # static assets
└── styles/            # global styles and tails
```

---

## ✨ Features
- User signup, login, and logout
- JWT-based authentication with protected routes
- Dashboard with book list and status tabs
- Add, update, and delete books
- Status categories: Want To Read / Reading / Completed
- Responsive design using Tailwind + ShadCN UI

---

## 📡 API Interaction
The frontend uses Redux async thunks to call backend endpoints defined in the `NEXT_PUBLIC_API_URL`. Responses update the Redux store, triggering UI updates. Authentication tokens are sent automatically via an HTTP-only cookie.

---

## 🧠 State Management
Redux Toolkit handles:
- Authentication state
- Books state
- Async loading/error states

Slices are defined under `frontend/redux/` and wired in `store.js`.

---

## 📝 Notes
- Ensure the backend server is running and `NEXT_PUBLIC_API_URL` is correct.
- Login status persists in local storage and cookies.
- Protected routes redirect unauthenticated users back to login.

---

## 🚢 Deployment
- Deploy to Vercel, Netlify, or any static hosting service.
- Set `NEXT_PUBLIC_API_URL` to the production backend URL.
- Run `npm run build` during deployment.

---

## 📌 Future Enhancements
- Add search, filter, and pagination
- Drag‑and‑drop book status changes
- Dark mode support
- User profile pages

---

## 🔌 API Endpoints (see backend readme for details)
Endpoints are grouped under `/auth` and `/books`. JWT authentication required for book routes.

---

## 🛠 Notes
- Ensure MongoDB is running and environment variables are set correctly.
- Backend and frontend maintainers can work independently; the UI consumes the API via `NEXT_PUBLIC_API_URL`.
- Each directory contains its own `README.md` with in-depth guidance.

---

## 📌 Future Work
- Add validation and testing
- Improve UX with search, pagination, dark mode
- Deploy to cloud platforms

---

Happy coding! 🎉
