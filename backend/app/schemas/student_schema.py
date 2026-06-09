from pydantic import BaseModel, EmailStr


class StudentSchema(BaseModel):
    name: str
    email: EmailStr
    age: int
    course: str


class StudentResponseSchema(BaseModel):

    id: str
    name: str
    email: EmailStr
    age: int
    course: str