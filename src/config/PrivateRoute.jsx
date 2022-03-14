import { Navigate, Outlet } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuthStatus } from "../hooks/useAuthStatus";

const PrivateRoute = () => {
	const { loggedIn, checkingStatus } = useAuthStatus();

	if (checkingStatus) {
		return <Spinner />;
	}

	return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
