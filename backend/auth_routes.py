from fastapi.exceptions import HTTPException

from fastapi import APIRouter, status
from fastapi.params import Depends
from fastapi_jwt_auth import AuthJWT

from database import Session, engine
from schemas import SignUpModel, LogInModel
from models import User, Order
from werkzeug.security import check_password_hash, generate_password_hash
from fastapi.encoders import jsonable_encoder


auth_router = APIRouter(
    prefix='/auth',
    tags=['auth']
)

session = Session(bind=engine)

@auth_router.get("/")
async def hello(Authorize: AuthJWT = Depends()):

    try:
        Authorize.jwt_required()
    except Exception:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    return {"message": "Hello World"}

# Signup api
@auth_router.post("/signup", status_code=status.HTTP_201_CREATED)
async def signup(user: SignUpModel):

    try:
        # Check if username already exists
        db_username = session.query(User).filter(User.username == user.username).first()
        if db_username is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with that username already exists"
            )
        
        # Check if email already exists
        db_email = session.query(User).filter(User.email == user.email).first()
        if db_email is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with that email already exists"
            )
        
        # Create new user
        new_user = User(
            username=user.username,
            email=user.email,
            password=generate_password_hash(user.password),
            is_active=user.is_active if user.is_active is not None else True,
            is_staff=user.is_staff if user.is_staff is not None else False
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
            detail=f"An error occurred: {str(e)}"
        )
    finally:
        session.close()

# Login api
@auth_router.post("/login", status_code=200)
async def login(user:LogInModel):

    try:
        # Find user by username
        db_user = session.query(User).filter(User.username == user.username).first()
        
        if not db_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password"
            )
        
        # Check password
        if not check_password_hash(db_user.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid username or password"
            )
        
        # Check if user is active
        if not db_user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is not active"
            )
        
        # Create JWT tokens - Create instance inside function (IMPORTANT!)
        authorize = AuthJWT()
        access_token = authorize.create_access_token(subject=db_user.username)
        refresh_token = authorize.create_refresh_token(subject=db_user.username)
        
        return {
            "message": "Login successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": db_user.id,
                "username": db_user.username,
                "email": db_user.email,
                "is_staff": db_user.is_staff,
                "is_active": db_user.is_active
            }
        }
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred: {str(e)}"
        )
    finally:
        session.close()


@auth_router.get("/refresh")
async def refresh_token():

    try:
        auhtorize = AuthJWT()
        authorize.jwt_refresh_token_required()
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Please provide a valid refresh token")

    current_user = authorize.get_jwt_subject()
    access_token = authorize.create_access_token(subject=current_user)

    return jsonable_encoder({"access": access_token})
