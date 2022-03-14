import React from "react";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";
import { Link } from "react-router-dom";

const ListingItem = ({ id, data, onDelete }) => {
	return (
		<li className="categoryListing">
			<Link
				to={`/category/${data.type}/${id}`}
				className="categoryListingLink"
			>
				<img
					src={data.imgUrls[0]}
					alt={data.name}
					className="categoryListingImg"
				/>
				<div className="categoryListingDetails">
					<p className="categoryListingLocation">{data.location}</p>
					<p className="categoryListingName">{data.name}</p>
					<p className="categoryListingPrice">
						₹{data.offer ? data.discountedPrice : data.regularPrice}
						{data.type === "rent" && " / Month"}
					</p>
					<div className="categoryListingInfoDiv">
						<img src={bedIcon} alt="bed icon" />
						<p className="categoryListingInfoText">
							{data.bedrooms > 1
								? `${data.bedrooms} Bedrooms`
								: "1 Bedroom"}
						</p>
						<img src={bathtubIcon} alt="bathtub" />
						<p className="categoryListingInfoText">
							{data.bathrooms > 1
								? `${data.bathrooms} Bathrooms`
								: "1 Bathroom"}
						</p>

					</div>
				</div>
			</Link>

			{onDelete && (
				<DeleteIcon className="removeIcon" fill="rgb(231, 76, 60)" onClick={() => onDelete(id, data.name)} />
			)}
		</li>
	);
};

export default ListingItem;
