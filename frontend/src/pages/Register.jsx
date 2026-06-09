import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./Login.css";

function Register() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [message, setMessage] =
        useState("");

    const navigate = useNavigate();

    const handleRegister =
        async () => {

            try {

                setLoading(true);

                await registerUser({
                    name,
                    email,
                    password
                });

                setMessage(
                    "Registration Successful"
                );

                setTimeout(() => {

                    navigate("/");

                }, 1500);

            } catch (error) {

                setMessage(
                    error.response?.data?.detail
                    || "Registration Failed"
                );

            } finally {

                setLoading(false);

            }
        };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>
                    Register
                </h1>

                <input
                    className="login-input"
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                />

                <input
                    className="login-input"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                />

                <input
                    className="login-input"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                {
                    message && (

                        <p>
                            {message}
                        </p>

                    )
                }

                <button
                    className="login-btn"
                    onClick={
                        handleRegister
                    }
                >

                    {
                        loading
                            ? "Registering..."
                            : "Register"
                    }

                </button>

            </div>

        </div>

    );
}

export default Register;