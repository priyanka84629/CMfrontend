import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
    const getUserDetails = JSON.parse(localStorage.getItem("token"))
    return (getUserDetails ? <Outlet /> : <Navigate to="/"/>)
}
export default ProtectedRoutes;