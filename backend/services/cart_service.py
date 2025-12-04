from fastapi import HTTPException
from backend.database.queries.cart_queries import (
    get_cart_items, upsert_cart_item, delete_cart_item, clear_cart
)
from backend.database.queries.product_queries import get_product_by_id

def list_cart(user_id: int):
    rows = get_cart_items(user_id)
    return [
        {
            "product_id": r[0],
            "quantity": r[1],
            "name": r[2],
            "price": float(r[3]),
            "image_url": r[4],
            "description": r[5],
            "category": r[6],
            "line_total": float(r[3]) * r[1] if r[3] is not None else 0.0
        }
        for r in rows
    ]

def add_or_update_item(user_id: int, product_id: int, quantity: int):
    if quantity <= 0:
        delete_cart_item(user_id, product_id)
        return
    product = get_product_by_id(product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    upsert_cart_item(user_id, product_id, quantity)

def remove_item(user_id: int, product_id: int):
    delete_cart_item(user_id, product_id)

def clear(user_id: int):
    clear_cart(user_id)
