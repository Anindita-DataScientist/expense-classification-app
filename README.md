# Expense Classification App

This project is a fintech expense classification and reporting tool.

## Tech Stack
- Frontend: React
- Backend: FastAPI
- Database: PostgreSQL
- Authentication: JWT
- CSV Parsing: pandas
- Charts: Chart.js

# Expense Classification App

A full-stack web application that allows users to sign up, log in, upload CSV files, and preview categorized data.

---

## Project Overview

This project is built to simplify expense data handling through a clean frontend and a Python backend. Users can create an account, log in, upload a CSV file, and view parsed data along with basic rule-based categorization.

The application is developed using:

- **Frontend:** React.js + CSS
- **Backend:** FastAPI
- **Database:** PostgreSQL
- **CSV Parsing:** Pandas

---

## Features Implemented

### Authentication
- User Signup
- User Login
- Password hashing before storing in database
- User data stored in PostgreSQL

### CSV Upload
- Upload CSV file from frontend
- Backend receives file through FastAPI
- CSV is parsed using Pandas
- Row count, columns, and preview are shown on frontend

### Categorization
- Rule-based categorization logic added
- Categories include:
  - Food
  - Transport
  - Shopping
  - Bills
  - Other

### Frontend Pages
- Signup Page
- Login Page
- Upload CSV Page
- Navigation between pages

---

## Tech Stack

### Frontend
- React.js
- CSS

### Backend
- FastAPI
- Python 3.12

### Database
- PostgreSQL

### Libraries Used
- Pandas
- SQLAlchemy
- Passlib
- python-dotenv
- python-jose

---

## Project Structure

```text
expense-classification-app/
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── home.py
│   │   │   ├── auth_routes.py
│   │   │   └── upload_routes.py
│   │   ├── services/
│   │   │   ├── csv_parser.py
│   │   │   ├── categorizer.py
│   │   │   └── export_service.py
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── utils.py
│   ├── main.py
│   ├── create_tables.py
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   └── UploadPage.jsx
│   │   ├── App.jsx
│   │   └── App.css
│
├── docs/
├── sample_data/
├── .env
├── .gitignore
└── README.md


Component Explanation
Frontend (React)

The frontend is built using React and provides the user interface for signup, login, CSV upload, dashboard summary, charts, and export interaction.

Backend (FastAPI)

The backend is built using FastAPI and handles authentication, file upload, CSV parsing, categorization, transaction storage, dashboard APIs, and CSV export.

Database (PostgreSQL)

PostgreSQL is used to store application data in structured tables:

users
transactions
uploads
categories
Services

The services layer keeps business logic separate from routes:

csv_parser.py handles CSV reading and validation
categorizer.py handles rule-based category mapping
export_service.py handles CSV export generation
Security Considerations
Passwords are stored in hashed format
Input validation is applied through Pydantic schemas
Only CSV files are allowed for upload
Empty files are rejected
Duplicate transactions are skipped
Backend returns proper HTTP errors for invalid input
Data Flow
User signs up or logs in
User uploads a CSV file
Backend validates the file
CSV is parsed using Pandas
Each row is categorized
Categories are stored in the categories table
Upload metadata is stored in uploads table
Transactions are stored in transactions table
Dashboard summary is generated from PostgreSQL
User can export stored transactions as CSV