from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from auth_routes import auth_router
from order_routes import order_router
from fastapi_jwt_auth import AuthJWT
from schemas import Settings
import inspect, re
from fastapi.openapi.utils import get_openapi
from fastapi.routing import APIRoute
from database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

# Create tables on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="PizzaSlice API",
    description="Pizza Delivery API with authentication",
    version="1.0.0"
)

# CORS Configuration - Allow all origins (you can restrict later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://pizzaslicee.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)

@app.get("/")
async def root():
    return {
        "status": "ok", 
        "message": "PizzaSlice API is running! 🍕"
    }

@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring"""
    return {"status": "healthy"}

# Custom OpenAPI schema for JWT authorization in Swagger
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title="PizzaSlice Auth API",
        version="1.0",
        description="Pizza Delivery API with JWT Authentication",
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "Bearer Auth": {
            "type": "apiKey",
            "in": "header",
            "name": "Authorization",
            "description": "Enter: **'Bearer &lt;JWT&gt;'**, where JWT is the access token"
        }
    }

    # Get all routes where jwt_optional() or jwt_required
    api_router = [route for route in app.routes if isinstance(route, APIRoute)]

    for route in api_router:
        path = getattr(route, "path")
        endpoint = getattr(route, "endpoint")
        methods = [method.lower() for method in getattr(route, "methods")]

        for method in methods:
            # Check if route uses JWT
            if (
                re.search("jwt_required", inspect.getsource(endpoint)) or
                re.search("fresh_jwt_required", inspect.getsource(endpoint)) or
                re.search("jwt_optional", inspect.getsource(endpoint))
            ):
                openapi_schema["paths"][path][method]["security"] = [
                    {
                        "Bearer Auth": []
                    }
                ]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi

# Include routers
app.include_router(auth_router)
app.include_router(order_router)

# JWT Configuration
@AuthJWT.load_config
def get_config():
    return Settings()