import csv
import io


def generate_csv_file(transactions):
    output = io.StringIO()
    writer = csv.writer(output)

    writer.writerow([
        "ID",
        "Date",
        "Description",
        "Amount",
        "Type",
        "Category",
    ])

    for transaction in transactions:
        writer.writerow([
            transaction.id,
            transaction.transaction_date,
            transaction.description,
            transaction.amount,
            transaction.transaction_type,
            transaction.category,
        ])

    output.seek(0)
    return output.getvalue()