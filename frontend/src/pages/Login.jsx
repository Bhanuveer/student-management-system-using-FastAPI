import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await loginUser({
                email,
                password
            });

            localStorage.setItem(
                "token",
                response.access_token
            );

            navigate("/dashboard");

            console.log(response);  

        } catch (error) {

            setLoading(false);

            setError(
                "Invalid Email or Password"
            );

        }
    };

    const handleKeyPress = (
        event
    ) => {

        if (
            event.key === "Enter"
        ) {

            handleLogin();

        }
    };

    return (

        <div className="login-container">

            <div className="login-card">

                <h1>
                    Student Management
                </h1>

                <input
                    className="login-input"
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    onKeyDown={handleKeyPress}
                />

                <input
                    className="login-input"
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    onKeyDown={handleKeyPress}
                />

                {
                    error && (

                        <p
                            style={{
                                color: "red",
                                textAlign: "center"
                            }}
                        >
                            {error}
                        </p>

                    )
                }

                <button
                    className="login-btn"
                    onClick={handleLogin}
                    disabled={loading}
                >

                    {
                        loading
                            ? "Logging In..."
                            : "Login"
                    }

                </button>

                <p
                    style={{
                        marginTop: "15px"
                    }}
                >

                    Don't have an account?

                    <Link to="/register">
                        {" "}
                        Register
                    </Link>

                </p>

            </div>

        </div>

    );
}

export default Login;
