import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibliltyIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";
import { auth, db } from "../config/Firebase";

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const { name, email, password } = formData;

	const navigate = useNavigate();

	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;

			updateProfile(auth.currentUser, {
				displayName: name,
			});

            const formDataCopy = {...formData}
            delete formDataCopy.password
            formDataCopy.timestamp = serverTimestamp()

            await setDoc(doc(db, "users", user.uid), formDataCopy)

			navigate("/");
		} catch (err) {
            toast.error("Something went wrong with registration!")
		}
	};

	return (
		<>
			<div className="pageContainer">
				<header>
					<p className="pageHeader">Welcome Back!</p>
				</header>
				<form onSubmit={(e) => onSubmit(e)}>
					<input
						type="text"
						id="name"
						placeholder="Name"
						className="nameInput"
						value={name}
						onChange={onChange}
					/>
					<input
						type="email"
						id="email"
						placeholder="Email"
						className="emailInput"
						value={email}
						onChange={onChange}
					/>
					<div className="passwordInputDiv">
						<input
							type={showPassword ? "text" : "password"}
							className="passwordInput"
							placeholder="Password"
							id="password"
							value={password}
							onChange={onChange}
						/>
						<img
							src={visibliltyIcon}
							alt="show password"
							className="showPassword"
							onClick={() =>
								setShowPassword((prevState) => !prevState)
							}
						/>
					</div>
					<div className="signUpBar">
						<p className="signUpText">Sign Up</p>
						<button className="signUpButton">
							<ArrowRightIcon
								fill="#fff"
								width={"34px"}
								height={"34px"}
							/>
						</button>
					</div>
				</form>

				<OAuth />

				<Link to="/login" className="registerLink">
					Already have a account? Login
				</Link>
			</div>
		</>
	);
};

export default SignUp;
