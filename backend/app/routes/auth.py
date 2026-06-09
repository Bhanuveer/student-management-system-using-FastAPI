from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.schemas.auth_schema import (
    RegisterSchema, LoginSchema
)

from app.services.auth_service import (
    create_user, login_user
)

from app.utils.auth_dependency import (
    get_current_user
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(user: RegisterSchema):

    user_id = create_user(
        user.model_dump()
    )

    return {
        "message": "User Registered",
        "user_id": user_id
    }

@router.post("/login")
def login(
    form_data: OAuth2PasswordRequestForm = Depends()
):

    return login_user(
        {
            "email": form_data.username,
            "password": form_data.password
        }
    )

@router.get("/profile")
def profile(
    current_user=Depends(
        get_current_user
    )
):

    return {
        "message": "Profile Accessed",
        "user": current_user
    }

from app.utils.jwt_handler import verify_access_token

@router.get("/test-protected")
def test_protected(
    current_user=Depends(get_current_user)
):
    return {
        "message": "Access Granted",
        "user": current_user
    }