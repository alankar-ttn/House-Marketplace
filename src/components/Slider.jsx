import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { db } from "../config/Firebase";
import Spinner from "./Spinner";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Slider = () => {
	const [loading, setLoading] = useState(true);
	const [listings, setListings] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		const fetchListing = async () => {
			const listingsRef = collection(db, "listings");
			const q = query(
				listingsRef,
				orderBy("timestamp", "desc"),
				limit(5)
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
		fetchListing();
	}, []);

	if (loading) {
		return <Spinner />;
	}

	return (
		listings && (
			<>
				<p className="exporeHeading">Recommended</p>
				<Swiper slidesPerView={1} pagination={{ clickable: true }}>
					{listings.map(({ id, data }) => (
						<SwiperSlide
							key={id}
							onClick={() =>
								navigate(`/category/${data.type}/${id}`)
							}
						>
							<div
								style={{
									background: `url(${data.imgUrls[0]}) center no-repeat`,
									backgroundSize: "cover",
								}}
								className="swiperSlideDiv"
							>
								<p className="swiperSlideText">{data.name}</p>
								<p className="swiperSlidePrice">
									₹{data.discountedPrice ?? data.regularPrice}
									{data.type === "rent" && " / month"}
								</p>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</>
		)
	);
};

export default Slider;
