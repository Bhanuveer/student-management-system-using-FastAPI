from app.database.mongodb import db
from fastapi import HTTPException
from app.utils.hash import hash_password
from app.utils.hash import verify_password
from app.utils.jwt_handler import create_access_token


def create_user(user_data):

    users_collection = db["users"]

    existing_user = users_collection.find_one(
        {"email": user_data["email"]}
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    user_data["password"] = hash_password(
        user_data["password"]
    )

    result = users_collection.insert_one(
        user_data
    )

    return str(result.inserted_id)

def login_user(user_data):

    users_collection = db["users"]

    user = users_collection.find_one(
        {"email": user_data["email"]}
    )

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    is_valid = verify_password(
        user_data["password"],
        user["password"]
    )

    if not is_valid:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email or Password"
        )

    token = create_access_token(
    {
        "email": user["email"]
    }
    )

    return {
        "access_token": token,
        "token_type": "bearer"
    }   