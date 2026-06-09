import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export const loginUser = async (userData) => {

    const formData = new URLSearchParams();

    formData.append(
        "username",
        userData.email
    );

    formData.append(
        "password",
        userData.password
    );

    const response = await axios.post(
        `${API_URL}/auth/login`,
        formData,
        {
            headers: {
                "Content-Type":
                    "application/x-www-form-urlencoded"
            }
        }
    );

    return response.data;
};

export const getProfile = async () => {

    const token = localStorage.getItem(
        "token"
    );

    const response = await axios.get(
        `${API_URL}/auth/profile`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};