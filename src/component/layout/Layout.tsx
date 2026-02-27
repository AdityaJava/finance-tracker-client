import { Outlet } from "react-router-dom";
import Sidebar from "../dashboard/Sidebar";

export default function Layout() {
    return (
        <div className="h-screen flex">
            <div className="w-64 fixed h-full">
                <Sidebar />
            </div>
            <div className="flex-1 ml-64 p-6 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}