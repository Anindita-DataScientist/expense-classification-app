def categorize_expense(description: str) -> str:
    description = str(description).lower()

    if "uber" in description or "ola" in description or "taxi" in description or "metro" in description:
        return "Transport"

    elif "zomato" in description or "swiggy" in description or "restaurant" in description or "cafe" in description:
        return "Food"

    elif "amazon" in description or "flipkart" in description or "myntra" in description or "shopping" in description:
        return "Shopping"

    elif "electricity" in description or "water" in description or "internet" in description or "bill" in description:
        return "Bills"

    elif "movie" in description or "netflix" in description or "spotify" in description:
        return "Entertainment"

    else:
        return "Other"