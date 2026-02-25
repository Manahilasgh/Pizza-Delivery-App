from fastapi import FastAPI, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from database import engine, Base, Session
from models import User
from werkzeug.security import generate_password_hash, check_password_hash
from fastapi_jwt_auth import AuthJWT
from schemas import Settings
import inspect, re
from fastapi.openapi.utils import get_openapi
from fastapi.routing import APIRoute

# Create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PizzaSlice API",
    description="Pizza Delivery API",
    version="1.0.0"
)

# CORS - Allow everything for now (we'll restrict later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow ALL origins temporarily
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class SignUpModel(BaseModel):
    username: str
    email: str
    password: str

class LogInModel(BaseModel):
    username: str
    password: str

# ROOT ENDPOINT
@app.get("/")
async def root():
    return {
        "status": "ok", 
        "message": "PizzaSlice API is running! 🍕",
        "cors": "WIDE OPEN (all origins allowed)"
    }

# SIGNUP - No JWT Auth dependency
@app.post('/auth/signup', status_code=status.HTTP_201_CREATED)
async def signup(user: SignUpModel):
    session = Session(bind=engine)
    
    try:
        # Check if user exists
        db_user = session.query(User).filter(
            (User.username == user.username) | (User.email == user.email)
        ).first()
        
        if db_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with that username or email already exists"
            )
        
        # Create new user
        new_user = User(
            username=user.username,
            email=user.email,
            password=generate_password_hash(user.password),
            is_active=True,
            is_staff=False
        )
        
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        
        return {
            "message": "User created successfully",
            "user": {
                "id": new_user.id,
                "username": new_user.username,
                "email": new_user.email
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        session.close()

# LOGIN - No JWT Auth dependency initially
@app.post('/auth/login')
async def login(user: LogInModel, Authorize: AuthJWT = None):
    session = Session(bind=engine)
    
    try:
        # Find user
        db_user = session.query(User).filter(User.username == user.username).first()
        
        if not db_user or not check_password_hash(db_user.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password"
            )
        
        if not db_user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is not active"
            )
        
        # Create JWT token if Authorize is provided
        access_token = None
        refresh_token = None
        
        if Authorize:
            access_token = Authorize.create_access_token(subject=db_user.username)
            refresh_token = Authorize.create_refresh_token(subject=db_user.username)
        
        return {
            "message": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": db_user.id,
                "username": db_user.username,
                "email": db_user.email,
                "is_staff": db_user.is_staff
            }
        }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
    finally:
        session.close()

# TEST ENDPOINT - No auth at all
@app.post('/test/echo')
async def echo_test(data: dict):
    return {
        "message": "Echo successful",
        "received": data,
        "cors": "working"
    }

@AuthJWT.load_config
def get_config():
    return Settings()

# Include your other routers if they exist
try:
    from order_routes import order_router
    app.include_router(order_router)
except:
    pass