from fastapi import FastAPI

from app.routes.auth import router as auth_router
from app.routes.student import router as student_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Student Management System API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(auth_router)
app.include_router(student_router)


@app.get("/")
def home():
    return {
        "message": "Student Management System API Running"
    }