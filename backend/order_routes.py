from http.client import responses

from fastapi import APIRouter, Depends, status
from fastapi.exceptions import HTTPException
from uvicorn.protocols.http.auto import AutoHTTPProtocol

from database import Session, engine
from fastapi.encoders import jsonable_encoder
from fastapi_jwt_auth import AuthJWT
from schemas import OrderModel, OrderStatusModel

from models import User, Order


order_router = APIRouter(
    prefix='/orders',
    tags=['orders']
)

session = Session(bind=engine)
@order_router.get("/")
async def hello(Authorize:AuthJWT = Depends()):

    try:
        Authorize.jwt_required()
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail='Invalid Token')

    return {"message": "Hello World"}

@order_router.post("/order", status_code=status.HTTP_201_CREATED)
async def place_an_order(order:OrderModel, Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")

    current_user = Authorize.get_jwt_subject()

    user = session.query(User).filter(User.username == current_user).first()

    new_order = Order(
        flavour = order.flavour,
        order_status = order.order_status,
        pizza_size = order.pizza_size,
        quantity = order.quantity,
    )
    new_order.user = user
    session.add(new_order)
    session.commit()

    response = {
        "flavour" : new_order.flavour,
        "order_status" : new_order.order_status,
        "pizza_size" : new_order.pizza_size,
        "quantity" : new_order.quantity,
        "id": new_order.id
    }

    return jsonable_encoder(response)

@order_router.get("/orders")
async def list_all_orders(Authorize: AuthJWT = Depends()):

    try:
        Authorize.jwt_required()
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")

    current_user = Authorize.get_jwt_subject()

    user = session.query(User).filter(User.username == current_user).first()

    if user.is_staff:
        orders = session.query(Order).all()
        return jsonable_encoder(orders)

    raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You are not superuser")


@order_router.get("/orders/{id}")
async def get_order_by_id(id:int, Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")

    user = Authorize.get_jwt_subject()
    current_user = session.query(User).filter(User.username==user).first()

    if current_user.is_staff:
        order = session.query(Order).filter(Order.id==id).first()
        return jsonable_encoder(order)

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED,detail="User not allowed to carry out request")

@order_router.get("/user/orders")
async def get_user_orders(Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")

    user = Authorize.get_jwt_subject()
    current_user = session.query(User).filter(User.username==user).first()

    return jsonable_encoder(current_user.orders)

@order_router.get("/user/orders/{id}")
async def get_specific_order(id:int, Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")

    subject = Authorize.get_jwt_subject()
    current_user = session.query(User).filter(User.username==subject).first()

    orders = current_user.orders

    for o in orders:
        if o.id == id:
            return jsonable_encoder(o)

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="No order with such id")

@order_router.put("/order/update/{id}")
async def update_order(id:int, order:OrderModel, Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")

    order_to_update = session.query(Order).filter(Order.id==id).first()

    # order_to_update.id = order.id
    order_to_update.flavour = order.flavour
    order_to_update.pizza_size = order.pizza_size
    order_to_update.quantity = order.quantity

    session.commit()

    response = {
        "id": order_to_update.id,
        "flavour": order_to_update.flavour,
        "order_status": order_to_update.order_status,
        "pizza_size": order_to_update.pizza_size,
        "quantity": order_to_update.quantity
    }
    return jsonable_encoder(order_to_update)

@order_router.patch("/order/update/{id}")
async def update_order_status(id:int, order:OrderStatusModel, Authorize:AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail= "Invalid Token")

    subject = Authorize.get_jwt_subject()
    current_user = session.query(User).filter(User.username == subject).first()

    if current_user.is_staff:
        status_to_update = session.query(Order).filter(Order.id==id).first()
        status_to_update.order_status = order.order_status
        session.commit()

        response = {
            "id": status_to_update.id,
            "flavour": status_to_update.flavour,
            "order_status": status_to_update.order_status,
            "pizza_status": status_to_update.pizza_size,
            "quantity": status_to_update.quantity
        }
        return jsonable_encoder(response)

@order_router.delete("/order/delete/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_order(id: int, Authorize: AuthJWT = Depends()):
    try:
        Authorize.jwt_required()
    except:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid Token")

    order_to_delete = session.query(Order).filter(Order.id==id).first()
    session.delete(order_to_delete)
    session.commit()

    return order_to_delete


