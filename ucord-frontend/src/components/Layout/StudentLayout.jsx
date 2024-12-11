import Header from "../Header/Header"
import { Outlet } from "react-router-dom"

export default function StudentLayout() {
    return (
        <div className="student-layout">
            <Header role='student' />
            <Outlet />
        </div>
    )
}
