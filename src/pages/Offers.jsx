import {
	collection,
	getDocs,
	limit,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ListingItem from "../components/ListingItem";
import Spinner from "../components/Spinner";
import { db } from "../config/Firebase";

const Offers = () => {
	const [listings, setListings] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchListings = async () => {
			try {
				const listingsRef = collection(db, "listings");
				const q = query(
					listingsRef,
					where("offer", "==", true),
					orderBy("timestamp", "desc"),
					limit(10)
				);

				const querySnap = await getDocs(q);

				const listings = [];

				querySnap.forEach((doc) => {
					listings.push({
						id: doc.id,
						data: doc.data(),
					});
				});
				setListings(listings);
				setLoading(false);
			} catch (error) {
				toast.error("Could not fetch listings");
			}
		};
		fetchListings();
	}, []);

	return (
		<div className="category">
			<header>
				<p className="pageHeader">Offers</p>
			</header>

			{loading ? (
				<Spinner />
			) : listings && listings.length > 0 ? (
				<>
					<main>
						<ul className="categoryListings">
							{listings.map((listing) => (
								<ListingItem
									id={listing.id}
									key={listing.id}
									data={listing.data}
								/>
							))}
						</ul>
					</main>
				</>
			) : (
				<p>There are no current offers</p>
			)}
		</div>
	);
};

export default Offers;
