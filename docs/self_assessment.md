# Self-Assessment

## Key Design Choices and Trade-Offs

One of the main design choices in this project was to use **React** for the frontend, **FastAPI** for the backend, and **PostgreSQL** for the database. This combination was chosen because it provides a clean full-stack structure and is easy to extend.

For CSV processing, **Pandas** was used because it makes parsing and validation simple. For categorization, a **rule-based approach** was used instead of machine learning. This was a practical trade-off because rule-based logic is easier to implement, explain, and debug within a short project timeline.

Another trade-off was storing category as text inside the transactions table while also maintaining a categories table. This keeps the implementation simple while still satisfying schema requirements.

## What Worked Well

- User signup and login functionality worked successfully with PostgreSQL storage.
- CSV upload and parsing worked correctly after handling format issues.
- Realistic bank-style CSV structure was supported with fields like Date, Description, Amount, and Type.
- Transactions were saved into PostgreSQL successfully.
- Categories and uploads were also stored in dedicated tables.
- Dashboard summary, charts, and date filtering worked properly.
- CSV export feature worked successfully.
- Frontend and backend integration worked end to end.

## What Can Be Improved

- JWT-based session handling can be added for stronger authentication flow.
- Logout can be improved further by clearing tokens and protecting routes.
- Dashboard can be improved with more visual analytics and spending trends.
- Export to PDF can be added in addition to CSV.
- Automatic support for multiple bank CSV formats can be improved further.
- Unit and integration tests should be added for production readiness.
- Cloud deployment can be completed with Docker and services like Vercel/Render/Supabase.

## Difficulties Faced and How They Were Resolved

### 1. CSV separator issue
At one stage, the uploaded CSV was not parsed correctly because it used semicolon separators instead of commas. This was resolved by updating the parser logic and later standardizing the CSV format for bank-style files.

### 2. Email validation package error
The signup schema used `EmailStr`, which required the `email-validator` package. Installing the missing package fixed the issue.

### 3. Password hashing issue
An issue occurred while using bcrypt with Passlib. This was resolved by switching to `pbkdf2_sha256`, which worked reliably for password hashing.

### 4. Upload failure in frontend
At one stage, upload failed because the backend server was not running. This was resolved by restarting the backend and improving frontend error handling to show clearer messages.

### 5. Duplicate transactions
Uploading the same CSV multiple times caused duplicate rows. This was resolved by checking for existing transactions before inserting new rows.

## Final Reflection

This project successfully reached the MVP stage of a fintech expense classification and reporting tool. It demonstrates a complete flow from authentication to CSV upload, transaction storage, categorization, dashboard summary, and CSV export. While there are areas for improvement, the current version provides a strong full-stack foundation and can be extended into a more production-ready fintech application.