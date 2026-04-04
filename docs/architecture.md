# Architecture Diagram & Explanation

## High-Level Architecture

```text
User
  ↓
React Frontend
  ↓
FastAPI Backend
  ↓
PostgreSQL Database



## Detailed flow 
[ User Browser ]
      ↓
[ React Frontend ]
- Login Page
- Signup Page
- Upload CSV Page
- Dashboard Page
      ↓
[ FastAPI Backend ]
- Authentication Routes
- Upload Routes
- Dashboard Routes
- Transaction Export Routes
      ↓
[ Services Layer ]
- CSV Parser
- Categorizer
- Export Service
      ↓
[ PostgreSQL Database ]
- users
- transactions
- uploads
- categories
