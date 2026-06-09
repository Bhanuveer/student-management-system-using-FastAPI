import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        navigate("/");
    };

    return (

        <nav className="navbar">

            <h2>
                Student Management
            </h2>

            <div className="nav-links">

                <Link
                    className={
                        location.pathname ===
                            "/dashboard"
                            ? "active-link"
                            : ""
                    }
                    to="/dashboard"
                >
                    Dashboard
                </Link>

                <Link
                    className={
                        location.pathname ===
                            "/students"
                            ? "active-link"
                            : ""
                    }
                    to="/students"
                >
                    Students
                </Link>

                <button
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </div>

        </nav>

    );
}

export default Navbar;