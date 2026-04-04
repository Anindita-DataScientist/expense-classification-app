# Backend Design & Schema

## Database Tables

### 1. users
Stores registered user details.

Fields:
- `id`
- `name`
- `email`
- `password_hash`
- `created_at`

### 2. transactions
Stores uploaded bank transaction rows.

Fields:
- `id`
- `transaction_date`
- `description`
- `amount`
- `transaction_type`
- `category`
- `created_at`

### 3. uploads
Stores uploaded file metadata.

Fields:
- `id`
- `filename`
- `upload_time`

### 4. categories
Stores category names detected during CSV processing.

Fields:
- `id`
- `name`
- `created_at`

## API Endpoints

### Home / Testing
- `GET /`
- `GET /api/test`

### Authentication
- `POST /auth/signup`
- `POST /auth/login`

### Upload
- `POST /upload/csv`

### Dashboard
- `GET /dashboard/summary`
- supports optional query params:
  - `start_date`
  - `end_date`

### Transactions
- `GET /transactions/export/csv`

## Design Notes
- FastAPI routes are separated by feature
- business logic is kept inside services
- PostgreSQL is used for structured storage
- Pydantic schemas validate request input
- SQLAlchemy models define database tables