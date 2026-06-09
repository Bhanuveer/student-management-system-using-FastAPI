import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { getStudents } from "../services/studentService";
import Navbar from "../components/Navbar";
import "./Dashboard.css";


function Dashboard() {

    const [user, setUser] = useState(null);
    const [totalStudents, setTotalStudents] = useState(0);
    const [averageAge, setAverageAge] = useState(0);
    const [totalCourses, setTotalCourses] = useState(0);

    useEffect(() => {

        fetchProfile();

        fetchStudentStats();

    }, []);

    const fetchProfile = async () => {

        try {

            const response =
                await getProfile();

            setUser(response.user);

        } catch (error) {

            console.log(error);

        }

    };

    const fetchStudentStats =
        async () => {

            try {

                const students =
                    await getStudents(
                        "",
                        1
                    );

                setTotalStudents(
                    students.length
                );

                const totalAge =
                    students.reduce(
                        (sum, student) =>
                            sum + student.age,
                        0
                    );

                const avgAge =
                    students.length > 0
                        ? Math.round(
                            totalAge /
                            students.length
                        )
                        : 0;

                setAverageAge(
                    avgAge
                );

                const uniqueCourses =
                    new Set(
                        students.map(
                            (student) =>
                                student.course
                        )
                    );

                setTotalCourses(
                    uniqueCourses.size
                );

            } catch (error) {

                console.log(error);

            }
        };

    return (

        <>

            <Navbar />

            <div className="dashboard-container">

            <div className="dashboard-header">

                <h1>Dashboard</h1>

                {
                    user && (
                        <h2>
                            Welcome {user.email}
                        </h2>
                    )
                }

            </div>

            <div className="cards-container">

                <div className="card">

                    <h2>
                        Total Students
                    </h2>

                    <p>
                        {totalStudents}
                    </p>

                </div>

                <div className="card">

                    <h2>
                        Average Age
                    </h2>

                    <p>
                        {averageAge}
                    </p>

                </div>

                <div className="card">

                    <h2>
                        Courses
                    </h2>

                    <p>
                        {totalCourses}
                    </p>

                </div>

            </div>

            </div>

        </>

    );
}

export default Dashboard;
