import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const getStudents = async (
    search = "",
    page = 1,
    sortOrder = "asc") => {

    const token = localStorage.getItem(
        "token"
    );

    const response = await axios.get(
        `${API_URL}/students?name=${search}&page=${page}&sort_by=age&sort_order=${sortOrder}`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const addStudent = async (studentData) => {

    const token = localStorage.getItem(
        "token"
    );

    const response = await axios.post(
        `${API_URL}/students`,
        studentData,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteStudent = async (
    studentId
) => {

    const token = localStorage.getItem(
        "token"
    );

    const response = await axios.delete(
        `${API_URL}/students/${studentId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateStudent = async (
    studentId,
    studentData
) => {

    const token = localStorage.getItem(
        "token"
    );

    const response = await axios.put(
        `${API_URL}/students/${studentId}`,
        studentData,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};