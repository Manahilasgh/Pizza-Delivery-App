from pydantic import BaseModel
from typing import Optional


class SignUpModel(BaseModel):
    username: str
    email: str
    password: str
    is_active: Optional[bool]
    is_staff: Optional[bool]

    class Config:
        orm_mode = True
        schema_extra = {
            'example':{
                'username': 'manahil',
                'email': 'manahil@practice.com',
                'password': 'password',
                'is_active': 'True',
                'is_staff': 'False'
            }
        }

class LogInModel(BaseModel):
    username: str
    password: str

class OrderModel(BaseModel):
    id: Optional[int]
    quantity: int
    order_status: Optional[str] = 'PENDING'
    pizza_size: Optional[str] = 'SMALL'
    flavour: Optional[str] = 'PEPERONI'
    user_id: Optional[int]

    class Config:
        orm_mode = True
        schema_extra ={
            'example': {
                'quantity': 7,
                'order_status': 'PENDING',
                'pizza_size': 'LARGE',
                'flavour': 'FAJITA'
            }
        }

class OrderStatusModel(BaseModel):
    order_status:Optional[str]  = "PENDING"\

    class Config:
        orm_mode = True,
        schema_extra = {
            "example": {
                "order_status": "PENDING"
            }
        }

class Settings(BaseModel):
    authjwt_secret_key:str = 'ea6e837931fa0df2679cb9b6951575b66468c670902938448c1de89557b46ace'

