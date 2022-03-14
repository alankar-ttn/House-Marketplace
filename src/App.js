import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import PrivateRoute from "./config/PrivateRoute";
import Category from "./pages/Category";
import Contact from "./pages/Contact";
import CreateListing from "./pages/CreateListing";
import Explore from "./pages/Explore";
import ForgoPassword from "./pages/ForgoPassword";
import Listing from "./pages/Listing";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

const App = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Explore />} />
					<Route path="/profile" element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="/create-listing" element={<CreateListing />} />
					<Route path="/offers" element={<Offers />} />
					<Route path="/category/:categoryName" element={<Category />} />
					<Route path="/category/:categoryName/:listingId" element={<Listing />} />
					<Route path="/login" element={<SignIn />} />
					<Route path="/contact/:landlordId" element={<Contact />} />
					<Route path="/register" element={<SignUp />} />
					<Route
						path="/forgot-password"
						element={<ForgoPassword />}
					/>
				</Routes>
				<Navbar />
			</BrowserRouter>
			<ToastContainer />
		</>
	);
};

export default App;
