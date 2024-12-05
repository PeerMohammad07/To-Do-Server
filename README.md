# **Advanced To-Do List Application - Backend**

## **Project Overview**

This repository contains the **backend** for the Advanced To-Do List Application. It is built using Node.js, Express.js, and MongoDB. The backend provides secure APIs for user authentication and task management, ensuring that users can manage their to-do tasks privately and efficiently.

---

## **Features**

1. User authentication using JWT tokens.
2. CRUD operations for managing tasks.
3. Filters for tasks based on:
   - Status (Pending, Completed, All)
   - Assignee
   - Due date (date range)
4. Secure routes with JWT middleware.

---

## **Technologies Used**

- **Node.js**: Runtime for server-side JavaScript.
- **Express.js**: Web framework for creating APIs.
- **MongoDB**: NoSQL database for storing user and task data.
- **JWT**: For secure user authentication.
- **Bcrypt**: For password hashing.

---

## **How to Run Locally**

### **Prerequisites**
1. **Install Node.js**: [Download and Install Node.js](https://nodejs.org/).
2. **MongoDB**: Set up a local MongoDB instance or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
3. **Environment Variables**: Configure `.env` file.

### **Steps**
1. Clone this repository:
   ```bash
   git clone https://github.com/YourUsername/todo-backend.git
   cd todo-backend

   
2. Install dependicies
   ```
    npm install
   ```

3. Environment Variables:
```
JWT_SECRET_KEY="To-do-secret-key"
JWT_REFRESH_SECRET_KEY="To-do-refresh-secret-key"
PORT = 3000
NODE_ENV="developmnet"
MONGO_DB_URL=mongodb+srv://peeru548:to-do@cluster0.zrfxa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```
4.Run the server:
```
npm run dev
```
