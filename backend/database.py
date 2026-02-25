import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
# Get database URL from environment variable (for Render deployment)
# Falls back to local database for development
DATABASE_URL = os.getenv(
    'DATABASE_URL',
    'postgresql://postgres:pgadmin@localhost/pizzaDatabase'
)

# Render provides postgres:// but SQLAlchemy needs postgresql://
if DATABASE_URL.startswith('postgres://'):
    DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)
engine = create_engine(DATABASE_URL, echo=True)
Session = sessionmaker(bind = engine)
Base = declarative_base()