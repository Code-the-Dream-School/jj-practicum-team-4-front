import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar";

export default function Layout() {
    return (
        <>
            {/* <Navbar /> */}
            {/* <Outlet /> is a placeholder that renders whatever child route matches. */}
            <Outlet />
        </>
    );
}
