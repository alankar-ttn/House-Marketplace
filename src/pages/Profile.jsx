import { updateProfile } from "firebase/auth";
import {
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, db } from "../config/Firebase";
import arrowRight from "../assets/svg/keyboardArrowRightIcon.svg";
import homeIcon from "../assets/svg/homeIcon.svg";
import ListingItem from "../components/ListingItem";

const Profile = () => {
	const [formData, setFormData] = useState({
		name: auth.currentUser.displayName,
		email: auth.currentUser.email,
	});

	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(true);

	const [changeDetails, setChangeDetails] = useState(false);

	const { name, email } = formData;

	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserListings = async () => {
			const listingsRef = collection(db, "listings");
			const q = query(
				listingsRef,
				where("userRef", "==", auth.currentUser.uid),
				orderBy("timestamp", "desc")
			);
			const querySnap = await getDocs(q);
			let listings = [];
			querySnap.forEach((doc) =>
				listings.push({
					id: doc.id,
					data: doc.data(),
				})
			);
			setListings(listings);
			setLoading(false);
		};
		fetchUserListings();
		// eslint-disable-next-line
	}, [auth.currentUser.uid]);

	const onLogout = () => {
		auth.signOut();
		navigate("/");
	};

	const onSubmit = async (e) => {
		try {
			if (auth.currentUser.displayName !== name) {
				await updateProfile(auth.currentUser, {
					displayName: name,
				});

				const userRef = doc(db, "users", auth.currentUser.uid);
				await updateDoc(userRef, {
					name,
				});
				toast.success("Profile updated successfully!");
			}
		} catch (err) {
			toast.error("Could not update profile details");
		}
	};

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onDelete = async (id) => {
		if (window.confirm("Are you sure you want to delete?")) {
			await deleteDoc(doc(db, "listings", id));
			const updatedListings = listings.filter((listing) => listing.id !== id)
			setListings(updatedListings)
			toast.success("Listing deleted successfully")
		}
	};

	return (
		<div className="profile">
			<header className="profileHeader">
				<p className="pageHeader">My Profile</p>
				<button className="logOut" onClick={onLogout}>
					Logout
				</button>
			</header>
			<main>
				<div className="profileDetailsHeader">
					<p className="profileDetailsText">Personal Details</p>
					<p
						className="changePersonalDetails"
						onClick={() => {
							changeDetails && onSubmit();
							setChangeDetails((prevState) => !prevState);
						}}
					>
						{changeDetails ? "done" : "change"}
					</p>
				</div>
				<div className="profileCard">
					<form>
						<input
							type="text"
							id="name"
							className={
								!changeDetails
									? "profileName"
									: "profileNameActive"
							}
							disabled={!changeDetails}
							value={name}
							onChange={onChange}
						/>
						<input
							type="email"
							id="email"
							className={
								!changeDetails
									? "profileEmail"
									: "profileEmailActive"
							}
							disabled={!changeDetails}
							value={email}
							onChange={onChange}
						/>
					</form>
				</div>
				<Link to={"/create-listing"} className="createListing">
					<img src={homeIcon} alt="home" />
					<p>Sell or Rent your home</p>
					<img src={arrowRight} alt="arrow right" />
				</Link>

				{!loading && listings?.length > 0 && (
					<>
						<p className="listingText">Your Listings</p>
						<ul className="listingsList">
							{listings.map((listing, index) => (
								<ListingItem
									key={index}
									data={listing.data}
									id={listing.id}
									onDelete={() => onDelete(listing.id)}
								/>
							))}
						</ul>
					</>
				)}
			</main>
		</div>
	);
};

export default Profile;
