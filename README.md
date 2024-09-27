# Cinema Reservation Management System API

## **Description**
This API provides a backend for managing cinema reservations, films, and screenings. It allows users to perform CRUD operations for films, screenings (seances), reservations, and user management.

## **Features**
- **User Authentication**: Secure access through JWT tokens.
- **Film Management**: Create, read, update, and delete films.
- **Screening Management**: Manage screenings with schedules and associated films.
- **Reservation Management**: Users can reserve seats for screenings.
- **Admin Role Management**: Only admin users can perform certain actions.

## **Technologies Used**
- **Node.js**: JavaScript runtime for building the API.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store data.
- **Mongoose**: ODM for MongoDB, providing schema-based solutions.
- **JWT**: JSON Web Tokens for authentication.

## **Getting Started**

### **Prerequisites**
- **Node.js (v14 or higher)**
- **MongoDB Atlas account (or local MongoDB instance)**
- **Postman (or any API testing tool)**

### **Installation**
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/cinema-reservation-api.git
  cd cinema-reservation-api
  npm install
  JWT_SECRET=your_jwt_secret
  npm start
  ```
