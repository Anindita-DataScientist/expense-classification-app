from backend.app.database import Base, engine
from backend.app.models import Category, Transaction, Upload, User

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")