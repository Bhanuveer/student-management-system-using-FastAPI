from app.database.mongodb import db
from fastapi import HTTPException
from bson import ObjectId


def create_student(
    student_data,
    current_user
):

    students_collection = db["students"]

    student_data["owner_email"] = (
        current_user["email"]
    )

    result = students_collection.insert_one(
        student_data
    )

    return str(result.inserted_id)

def get_all_students(current_user, name=None,
                     page= 1, limit= 5, sort_by=None,
                    sort_order="asc"):

    students_collection = db["students"]

    filter_query = {
        "owner_email":
        current_user["email"]
    }

    if name:

        filter_query["name"] = {
            "$regex": name,
            "$options": "i"
        }

    skip = (page - 1) * limit

    sort_direction = 1

    if sort_order == "desc":
        sort_direction = -1

    query = students_collection.find(
    filter_query
)

    if sort_by:
        query = query.sort(
            sort_by,
            sort_direction
        )

    students = list(
        query
        .skip(skip)
        .limit(limit)
    )

    formatted_students = []

    for student in students:

        formatted_students.append({
            "id": str(student["_id"]),
            "name": student["name"],
            "email": student["email"],
            "age": student["age"],
            "course": student["course"]
        })

    return formatted_students


def get_student_by_id(student_id, current_user):

    students_collection = db["students"]

    try:

        student = students_collection.find_one(
            {
                "_id": ObjectId(student_id),
                "owner_email":
                current_user["email"]
            }
        )

    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Invalid Student ID"
        )

    if not student:

        raise HTTPException(
            status_code=404,
            detail="Student Not Found"
        )

    student["id"] = str(
        student["_id"]
    )

    del student["_id"]
    del student["owner_email"]

    return student

def update_student(
    student_id,
    student_data,
    current_user
):

    students_collection = db["students"]

    try:

        result = students_collection.update_one(
            {
                "_id": ObjectId(student_id),
                "owner_email":
                current_user["email"]
            },
            {
                "$set": student_data
            }
        )

    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Invalid Student ID"
        )

    if result.matched_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Student Not Found"
        )

    return {
        "message": "Student Updated Successfully"
    }



def delete_student(student_id, current_user):

    students_collection = db["students"]

    try:

        result = students_collection.delete_one(
            {
                "_id": ObjectId(student_id),
                "owner_email":
                current_user["email"]
            }
        )

    except Exception:

        raise HTTPException(
            status_code=400,
            detail="Invalid Student ID"
        )

    if result.deleted_count == 0:

        raise HTTPException(
            status_code=404,
            detail="Student Not Found"
        )

    return {
        "message": "Student Deleted Successfully"
    }