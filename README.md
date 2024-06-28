# Student Dashboard

A simple student dashboard application built with the MERN(MongoDB, ExpressJS, ReactJS, NodeJS) stack, utilizing ShadCN UI components and styled with Tailwind CSS.

# Live Preview

https://student-dashboard-swart.vercel.app/

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Contact](#contact)
- [License](#license)

## Features

- Add A Student
- Dashboard displaying student information (still in development)
- Fetch Details of Student
- Edit and Delete Student
- Responsive design

## Tech Stack

**Frontend:**

- React
- Shadcn UI
- Tailwind CSS

**Backend:**

- Node.js
- Express
- MongoDB

## Installation

### Prerequisites

Ensure you have the following :

- [Node.js](https://nodejs.org/) - Install on your machine.
- [MongoDB Atlas](https://www.mongodb.com/atlas) - Cloud service no need to install any software. Just visit the MongoDB website and follow the instructions. You can also install MongoDB locally using MongoCompass.

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/KartikLakhotiya/Student-Dashboard.git

2. Install dependencies in both frontend and backend folder:
    ```bash
    cd frontend
    npm install
    ```
    ```bash
    cd backend
    npm install
    ```

3. Create a `.env` file in the root directory of backend folder and add your MongoDB connection string:
    ```
    PORT=5000
    MONGO_URI="your_mongo_atlas_connection_string"
    ```

## Running the Application

1. Go into the backend directory:
    ```bash
    cd backend
    npm start
    ```

2. Go into the frontend directory:
    ```bash
    cd frontend
    npm run dev
    ```

The API (Backend) will be running at `http://localhost:5000`.
The Frontent will be running at `http://localhost:5173`.

## Contact

For questions or support, please open an issue in this repository.


---

Please leave a star. Happy Coding.

---
