import io

from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.models import Transaction
from app.services.export_service import generate_csv_file
from app.utils import get_db

router = APIRouter(prefix="/transactions", tags=["Transactions"])


@router.get("/export/csv")
def export_transactions_csv(db: Session = Depends(get_db)):
    transactions = db.query(Transaction).all()

    csv_content = generate_csv_file(transactions)
    csv_file = io.StringIO(csv_content)

    return StreamingResponse(
        iter([csv_file.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=transactions_report.csv"},
    )