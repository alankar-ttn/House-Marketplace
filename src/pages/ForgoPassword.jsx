import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import { auth } from "../config/Firebase";

const ForgoPassword = () => {
	const [email, setEmail] = useState("");

	const onChange = (e) => setEmail(e.target.value);

	const onSubmit = async (e) => {
		e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email)
            toast.success("Email sent successfully")
        } catch (err) {
            toast.error("Could not send reset email!!!")
        }
	};

	return (
		<div className="pageContainer">
			<header>
				<p className="pageHeader">Forgot Password</p>
			</header>
			<main>
				<form onSubmit={onSubmit}>
					<input
						type="email"
						id="email"
						className="emailInput"
						value={email}
						onChange={onChange}
						placeholder="Email"
					/>
					<Link to={"/login"} className="forgotPasswordLink">
						Sign In
					</Link>
					<div className="signInBar">
						<div className="signInText">Send Reset Link</div>
						<button className="signInButton">
							<ArrowRightIcon
								fill="#fff"
								width={"34px"}
								height="34px"
							/>
						</button>
					</div>
				</form>
			</main>
		</div>
	);
};

export default ForgoPassword;
