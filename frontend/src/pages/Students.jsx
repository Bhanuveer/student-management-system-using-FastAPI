import { useEffect, useState } from "react";
import "./Students.css";
import {
    getStudents,
    addStudent,
    deleteStudent,
    updateStudent
} from "../services/studentService";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Students() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [course, setCourse] = useState("");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [sortOrder, setSortOrder] = useState("asc");
    const [editingId, setEditingId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {

        fetchStudents();

    }, [page, sortOrder]);

    const fetchStudents = async () => {

        try {

            setLoading(true);

            const response =
                await getStudents(search, page, sortOrder);

            setStudents(response);

            setLoading(false);

        } catch (error) {

            setLoading(false);

            console.log(error);

        }
    };

    const handleAddStudent = async () => {

        try {

            await addStudent({
                name,
                email,
                age: Number(age),
                course
            });

            fetchStudents();

            setName("");
            setEmail("");
            setAge("");
            setCourse("");

        } catch (error) {

            console.log(error);

        }
    };

    const handleEditStudent = (
        student
    ) => {

        console.log(student);

        setEditingId(student.id);

        console.log(student.id);

        setName(student.name);

        setEmail(student.email);

        setAge(student.age);

        setCourse(student.course);
    };

    const handleUpdateStudent =
        async () => {

            try {

                await updateStudent(
                    editingId,
                    {
                        name,
                        email,
                        age: Number(age),
                        course
                    }
                );

                setEditingId(null);

                setName("");
                setEmail("");
                setAge("");
                setCourse("");

                fetchStudents();

            } catch (error) {

                console.log(error);

            }
        };

    const handleDeleteStudent = async (
        studentId
    ) => {

        setDeleteId(studentId);
    };

    const handleCancelDelete = () => {

        setDeleteId(null);
    };

    const handleConfirmDelete = async () => {

        try {

            await deleteStudent(
                deleteId
            );

            setDeleteId(null);

            fetchStudents();

        } catch (error) {

            console.log(error);

        }
    };

    const handleNextPage = () => {

        setPage(
            page + 1
        );
    };

    const handlePreviousPage = () => {

        if (page > 1) {

            setPage(
                page - 1
            );
        }
    };

    return (

        <>
            <Navbar />
            
            <div className="container">

            <div className="header">

                <h1>
                    Student Management
                </h1>

            </div>

            <hr />

            <div className="form-section">

                <input
                    placeholder="Search Student"
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />

                <button
                    onClick={fetchStudents}
                >
                    Search
                </button>

                <select
                    value={sortOrder}
                    onChange={(e) =>
                        setSortOrder(
                            e.target.value
                        )
                    }
                >
                    <option value="asc">
                        Age Ascending
                    </option>

                    <option value="desc">
                        Age Descending
                    </option>
                </select>

                <hr />

                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <input
                    placeholder="Age"
                    value={age}
                    onChange={(e) =>
                        setAge(e.target.value)
                    }
                />

                <input
                    placeholder="Course"
                    value={course}
                    onChange={(e) =>
                        setCourse(e.target.value)
                    }
                />

                {
                    editingId ? (

                        <button
                            onClick={
                                handleUpdateStudent
                            }
                        >
                            Update Student
                        </button>

                    ) : (

                        <button
                            onClick={
                                handleAddStudent
                            }
                        >
                            Add Student
                        </button>

                    )
                }

            </div>

            <hr />

            <div className="pagination">

                <h3>
                    Current Page: {page}
                </h3>

                <button
                    onClick={
                        handlePreviousPage
                    }
                >
                    Previous
                </button>

                <button
                    onClick={
                        handleNextPage
                    }
                >
                    Next
                </button>

            </div>

            <hr />


            {
                loading ? (

                    <h3>
                        Loading Students...
                    </h3>

                ) : students.length === 0 ? (

                    <h3>
                        No Students Found
                    </h3>

                ) : (

                    <table className="student-table">

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Age</th>

                                <th>Course</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                students.map(
                                    (student) => (

                                        <tr
                                            key={student.id}
                                        >

                                            <td>
                                                {student.name}
                                            </td>

                                            <td>
                                                {student.email}
                                            </td>

                                            <td>
                                                {student.age}
                                            </td>

                                            <td>
                                                {student.course}
                                            </td>

                                            <td>

                                                <button
                                                    className="edit-btn"
                                                    onClick={() =>
                                                        handleEditStudent(
                                                            student
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        handleDeleteStudent(
                                                            student.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    )
                                )
                            }

                        </tbody>

                    </table>

                )
            }

            </div>

            {
                deleteId && (

                    <div className="confirm-overlay">

                        <div className="confirm-box">

                            <h3>
                                Delete Student?
                            </h3>

                            <p>
                                Are you sure you want to delete this student?
                            </p>

                            <div className="confirm-actions">

                                <button
                                    className="cancel-btn"
                                    onClick={
                                        handleCancelDelete
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    className="delete-btn"
                                    onClick={
                                        handleConfirmDelete
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </>
    );
}

export default Students;
