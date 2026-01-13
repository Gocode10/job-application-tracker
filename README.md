# Job Application Tracker

A full-stack web application to help users track their job applications, manage application statuses, and keep notes in one place.


## 🚀 Features

- User authentication using JWT (Register / Login)
- Protected routes on both frontend and backend
- Create, update, and delete job applications
- Track application status (Applied, Interview, Offer, Rejected)
- Add optional notes for each job application
- Automatically track applied date
- Clean and responsive dashboard UI


## 🛠 Tech Stack

### Frontend
- React
- React Router
- Axios
- JavaScript
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication


## 📂 Project Structure 
```
job-application-tracker/
│
├── backend/
| ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── middleware/
│ └── index.js
├── frontend/
│ ├── src/
│ ├── components/
│ └── App.jsx
│ └── main.jsx
├── .gitignore

```
## ⚙️ How to Run Locally
```
1️⃣ Clone the repository
bash
git clone https://github.com/Gocode10/job-application-tracker.git
cd job-application-tracker

2️⃣ Backend Setup
cd backend
npm install

Create a .env file inside backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Run the backend server:
npm run dev

Backend runs on:
http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173


🔐 Authentication Flow:
JWT token is generated on login/register
Token is stored in localStorage
Protected routes are handled using a ProtectedRoute component
Axios interceptors attach the token to API requests
Users are automatically logged out on unauthorized responses
```

👤 Author
Vaibhav Saini
