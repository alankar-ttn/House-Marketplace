import React from "react";
import { ReactComponent as OfferIcon } from "../assets/svg/localOfferIcon.svg";
import { ReactComponent as ExploreIcon } from "../assets/svg/exploreIcon.svg";
import { ReactComponent as PersonOutlineIcon } from "../assets/svg/personOutlineIcon.svg";
import { NavLink, useLocation } from "react-router-dom";

const Navbar = () => {

    const location = useLocation()

    const pathMatchRoute = (route) => {
        if (route === location.pathname) {
            return true;
        }
    }

	return (
		<footer className="navbar">
			<nav className="navbarNav">
				<ul className="navbarListItems">
					<li className="navbarListItem">
						<NavLink className={"navbarListItem"} to={"/"}>
							<ExploreIcon
								fill={pathMatchRoute("/") ? "#2c2c2c" : "#8f8f8f"}
								width="36px"
								height="36px"
							/>
							<p className={pathMatchRoute("/") ? "navbarListItemNameActive" : "navbarListItemName"}>Explore</p>
						</NavLink>
					</li>
					<li className="navbarListItem">
						<NavLink className={"navbarListItem"} to={"/offers"}>
							<OfferIcon
								fill={pathMatchRoute("/offers") ? "#2c2c2c" : "#8f8f8f"}
								width="36px"
								height="36px"
							/>
							<p className={pathMatchRoute("/offers") ? "navbarListItemNameActive" : "navbarListItemName"}>Offers</p>
						</NavLink>
					</li>
					<li className="navbarListItem">
						<NavLink className={"navbarListItem"} to="/profile">
							<PersonOutlineIcon
								fill={pathMatchRoute("/profile") ? "#2c2c2c" : "#8f8f8f"}
								width="36px"
								height="36px"
							/>
							<p className={pathMatchRoute("/profile") ? "navbarListItemNameActive" : "navbarListItemName"}>Profile</p>
						</NavLink>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default Navbar;
