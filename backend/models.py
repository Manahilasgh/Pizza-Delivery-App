from sqlalchemy import Integer, String, Text, ForeignKey, Boolean,Column
from sqlalchemy.orm import relationship
from sqlalchemy_utils.types import ChoiceType

from database import Base

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(25), unique=True)
    email = Column(String(80), unique=True)
    password = Column(Text, nullable=False)
    is_active = Column(Boolean, default=False)
    is_staff = Column(Boolean, default=False)
    orders = relationship('Order', back_populates='user')

    def __repr__(self):
        return f"<User {self.username}>"


class Order(Base):

    PIZZA_SIZES = (
    ('SMALL', 'small'),
    ('MEDIUM', 'medium'),
    ('LARGE', 'large'),
    ('EXTRA-LARGE', 'extra-large')
    )
    ORDER_STATUSES = (
        ('PENDING', 'pending'),
        ('IN-TRANSIT', 'in-transit'),
        ('DELIVERED', 'delivered')
    )
    FLAVOURS = (
    ('CHICKEN TIKKA', 'chicken tikka'),
    ('FAJITA', 'fajita'),
    ('CHEESE', 'cheese'),
    ('HOT N SPICY', 'hot n spicy'),
    ('PERI PERI', 'peri peri'),
    ('PEPERONI', 'peperoni')
    )


    __tablename__ = 'orders'
    id = Column(Integer, primary_key=True)
    quantity = Column(Integer, nullable=False)
    order_status = Column(ChoiceType(choices=ORDER_STATUSES), default='PENDING')
    pizza_size = Column(ChoiceType(choices=PIZZA_SIZES), default='SMALL')
    flavour = Column(ChoiceType(choices=FLAVOURS), default='PEPERONI')
    user_id = Column(Integer, ForeignKey('user.id'))
    user = relationship('User', back_populates='orders')

    def __repr__(self):
        return f"<Order {self.id}>"
