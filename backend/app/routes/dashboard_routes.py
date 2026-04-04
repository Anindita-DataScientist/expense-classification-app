from fastapi import APIRouter, Depends, Query
from sqlalchemy import func
from sqlalchemy.orm import Session

from backend.app.models import Transaction
from backend.app.utils import get_db

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/summary")
def get_dashboard_summary(
    start_date: str | None = Query(default=None),
    end_date: str | None = Query(default=None),
    db: Session = Depends(get_db),
):
    query = db.query(Transaction)

    if start_date:
        query = query.filter(Transaction.transaction_date >= start_date)

    if end_date:
        query = query.filter(Transaction.transaction_date <= end_date)

    total_transactions = query.count()

    category_summary = (
        query.with_entities(Transaction.category, func.count(Transaction.id))
        .group_by(Transaction.category)
        .all()
    )

    formatted_summary = [
        {"category": category, "count": count}
        for category, count in category_summary
    ]

    return {
        "total_transactions": total_transactions,
        "category_summary": formatted_summary,
        "start_date": start_date,
        "end_date": end_date,
    }