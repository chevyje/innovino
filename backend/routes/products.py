# from typing import List, Optional

# from fastapi import APIRouter
# from pydantic import BaseModel

# from backend.database import select_db


# class ProductOut(BaseModel):
#     id: int
#     name: str
#     image_url: Optional[str] = None
#     price: float
#     description: Optional[str] = None
#     active: bool
#     category: Optional[str] = None


# router = APIRouter(prefix="/products", tags=["products"])


# @router.get("/", response_model=List[ProductOut])
# def list_products(only_active: bool = True) -> List[ProductOut]:
#     query = (
#         "SELECT id, name, image_url, price, description, active, category "
#         "FROM products"
#     )
#     if only_active:
#         query += " WHERE active = TRUE"
#     query += " ORDER BY name"

#     rows = select_db(query) or []
#     products: List[ProductOut] = []
#     for row in rows:
#         price_value = float(row[3]) if row[3] is not None else 0.0
#         products.append(
#             ProductOut(
#                 id=row[0],
#                 name=row[1],
#                 image_url=row[2],
#                 price=price_value,
#                 description=row[4],
#                 active=row[5],
#                 category=row[6],
#             )
#         )

#     return products
from typing import List, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from backend.database import select_db

class ProductOut(BaseModel):
    id: int
    name: str
    image_url: Optional[str] = None
    price: float
    description: Optional[str] = None
    active: bool
    category: Optional[str] = None

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/", response_model=List[ProductOut])
def list_products(only_active: bool = True) -> List[ProductOut]:
    query = (
        "SELECT id, name, image_url, price, description, active, category "
        "FROM products"
    )
    if only_active:
        query += " WHERE active = TRUE"
    query += " ORDER BY name"

    rows = select_db(query) or []
    products: List[ProductOut] = []
    for row in rows:
        products.append(
            ProductOut(
                id=row[0],
                name=row[1],
                image_url=row[2],
                price=float(row[3]) if row[3] is not None else 0.0,
                description=row[4],
                active=row[5],
                category=row[6],
            )
        )
    return products

@router.get("/{product_id}", response_model=ProductOut)
def get_product(product_id: int):
    rows = select_db(
        "SELECT id, name, image_url, price, description, active, category "
        "FROM products WHERE id = %s",
        (product_id,),
    )
    if not rows:
        raise HTTPException(status_code=404, detail="Product niet gevonden")

    row = rows[0]
    return ProductOut(
        id=row[0],
        name=row[1],
        image_url=row[2],
        price=float(row[3]),
        description=row[4],
        active=row[5],
        category=row[6],
    )
