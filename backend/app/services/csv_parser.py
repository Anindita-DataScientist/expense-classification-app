import io

import pandas as pd

from backend.app.services.categorizer import categorize_expense


def parse_csv_file(file_bytes: bytes):
    csv_data = io.StringIO(file_bytes.decode("utf-8"))
    df = pd.read_csv(csv_data)

    required_columns = ["Date", "Description", "Amount", "Type"]

    for column in required_columns:
        if column not in df.columns:
            raise ValueError(f"Missing required column: {column}")

    df["Category"] = df["Description"].apply(categorize_expense)

    return df