# BookIt-Adventures

BookIt-Adventures is a full-stack web application for browsing and booking travel experiences.

## Tech Stack

**Frontend:**

*   [Next.js](https://nextjs.org/)
*   [React](https://reactjs.org/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [Tailwind CSS](https://tailwindcss.com/)

**Backend:**

*   [Node.js](https://nodejs.org/)
*   [Express](https://expressjs.com/)
*   [TypeScript](https://www.typescriptlang.org/)
*   [MongoDB](https://www.mongodb.com/)
*   [Mongoose](https://mongoosejs.com/)

## Getting Started

### Prerequisites

*   Node.js (v20.x or later)
*   npm
*   MongoDB

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/MANYA-SHUKLA/BookIt-Adventures.git
    cd bookit-project
    ```

2.  **Install backend dependencies:**

    ```bash
    cd backend
    npm install
    ```

3.  **Install frontend dependencies:**

    ```bash
    cd ../frontend
    npm install
    ```

4.  **Environment Variables:**

    The backend requires a `.env` file with a MongoDB connection string. Create a `.env` file in the `backend` directory:

    ```
    MONGO_URI=your_mongodb_connection_string
    ```

## Running the Application

You will need to run two terminals, one for the backend and one for the frontend.

### Backend

1.  Navigate to the `backend` directory:

    ```bash
    cd backend
    ```

2.  Start the development server:

    ```bash
    npm run dev
    ```

    The backend server will be running on `http://localhost:5000` (or the port specified in your environment).

### Frontend

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2.  Start the development server:

    ```bash
    npm run dev
    ```

    The frontend application will be running on `http://localhost:3000`.

## Seeding the Database

To populate the database with initial data, run the following command from the `backend` directory:

```bash
npm run seed
```
