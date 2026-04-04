# Technology Stack & Deployment

## Technology Stack

### Frontend
- **React.js**
- **CSS**
- **react-chartjs-2**
- **chart.js**

### Backend
- **FastAPI**
- **Python 3.12**
- **SQLAlchemy**
- **Pydantic**

### Database
- **PostgreSQL**

### Data Processing
- **Pandas**

## Why This Stack Was Chosen

### Why React
React was chosen because it makes it easy to build reusable frontend pages such as login, signup, upload, and dashboard.

### Why FastAPI
FastAPI was chosen because it is simple, fast, and suitable for building REST APIs for authentication, file upload, and dashboard data.

### Why PostgreSQL
PostgreSQL was chosen because it is a strong relational database and works well for structured fintech data such as users, transactions, uploads, and categories.

### Why Pandas
Pandas was chosen because it simplifies CSV parsing, validation, preview generation, and transaction data processing.

## Deployment Approach

### Current Development Setup
- Frontend runs locally using Vite/React
- Backend runs locally using FastAPI
- PostgreSQL runs locally through pgAdmin/PostgreSQL server

### Cloud-Ready Deployment Plan
This application can be deployed as follows:

- **Frontend:** Vercel
- **Backend:** Render or Railway
- **Database:** Supabase PostgreSQL or Neon PostgreSQL

### Docker Containerization
For production readiness, the frontend and backend can be containerized using Docker.

Possible Docker setup:
- React frontend container
- FastAPI backend container
- PostgreSQL database container or managed cloud database

### AWS / Azure / GCP Readiness
The system is designed in a way that it can be hosted on:
- AWS
- Azure
- GCP

For example:
- frontend can be hosted on static hosting/CDN
- backend can run on container services
- PostgreSQL can be hosted as a managed cloud database

## Notes
For this project version, the application was developed and tested locally. The architecture is deployment-ready and can be moved to cloud hosting with Docker and managed database services in the next phase.