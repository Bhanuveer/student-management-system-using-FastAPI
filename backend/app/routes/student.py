from fastapi import APIRouter, Depends

from app.schemas.student_schema import (
    StudentSchema, StudentResponseSchema
)

from app.services.student_service import (
    create_student, get_all_students, get_student_by_id, update_student,
    delete_student
)

from app.utils.auth_dependency import (
    get_current_user
)

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


@router.post("/")
def add_student(
    student: StudentSchema,
    current_user=Depends(get_current_user)
):

    student_id = create_student(
        student.model_dump(),
        current_user
    )

    return {
        "message": "Student Added Successfully",
        "student_id": student_id
    }

@router.get("/")
def get_students(
    name: str = None,
    page: int = 1,
    limit: int = 5,
    current_user=Depends(get_current_user),
    sort_by: str = None,
    sort_order: str = "asc"
):

    return get_all_students(
        current_user,
        name,
        page,
        limit,
        sort_by,
        sort_order
    )


@router.get("/{student_id}",response_model=StudentResponseSchema)
def get_student(
    student_id: str,
    current_user=Depends(
        get_current_user
    )
):

    return get_student_by_id(
        student_id,
        current_user
    )

@router.put("/{student_id}")
def update_student_route(
    student_id: str,
    student: StudentSchema,
    current_user=Depends(get_current_user)
):

    return update_student(
        student_id,
        student.model_dump(),
        current_user
    )


@router.delete("/{student_id}")
def delete_student_route(
    student_id: str,
    current_user=Depends(get_current_user)
):

    return delete_student(
        student_id,
        current_user
    )