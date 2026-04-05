from fastapi import APIRouter, Depends, File, HTTPException, UploadFile
from sqlalchemy.orm import Session

from app.models import Category, Transaction, Upload
from app.services.csv_parser import parse_csv_file
from app.utils import get_db

router = APIRouter(prefix="/upload", tags=["Upload"])


@router.post("/csv")
async def upload_csv(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="Only CSV files are allowed")

    contents = await file.read()

    if not contents:
        raise HTTPException(status_code=400, detail="Uploaded file is empty")

    try:
        df = parse_csv_file(contents)

        new_upload = Upload(filename=file.filename)
        db.add(new_upload)
        db.commit()
        db.refresh(new_upload)

        saved_count = 0
        skipped_count = 0

        for _, row in df.iterrows():
            transaction_date = str(row.get("Date", "")).strip()
            description = str(row.get("Description", "")).strip()
            amount = str(row.get("Amount", "")).strip()
            transaction_type = str(row.get("Type", "")).strip()
            category_name = str(row.get("Category", "Other")).strip() or "Other"

            existing_category = (
                db.query(Category)
                .filter(Category.name == category_name)
                .first()
            )

            if not existing_category:
                new_category = Category(name=category_name)
                db.add(new_category)
                db.commit()

            existing_transaction = (
                db.query(Transaction)
                .filter(
                    Transaction.transaction_date == transaction_date,
                    Transaction.description == description,
                    Transaction.amount == amount,
                    Transaction.transaction_type == transaction_type,
                )
                .first()
            )

            if existing_transaction:
                skipped_count += 1
                continue

            transaction = Transaction(
                transaction_date=transaction_date,
                description=description,
                amount=amount,
                transaction_type=transaction_type,
                category=category_name,
            )

            db.add(transaction)
            saved_count += 1

        db.commit()

        return {
            "filename": file.filename,
            "upload_id": new_upload.id,
            "columns": df.columns.tolist(),
            "row_count": len(df),
            "saved_count": saved_count,
            "skipped_duplicates": skipped_count,
            "preview": df.head(5).to_dict(orient="records"),
            "message": "CSV processed successfully",
        }

    except ValueError as error:
        raise HTTPException(status_code=400, detail=str(error))
    except Exception as error:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(error))