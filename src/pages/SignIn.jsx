import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibliltyIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";
import { auth } from "../config/Firebase";

const SignIn = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

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
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
    
            if (userCredential.user) {
                navigate("/");
            }
		} catch (err) {
			toast.error("Bad user Credentials!")
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
						type="email"
						id="email"
						placeholder="Email"
						className="emailInput"
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
					<Link
						to={"/forgot-password"}
						className="forgotPasswordLink"
					>
						Forgot Password
					</Link>
					<div className="signInBar">
						<p className="signInText">Sign In</p>
						<button className="signInButton">
							<ArrowRightIcon
								fill="#fff"
								width={"34px"}
								height={"34px"}
							/>
						</button>
					</div>
				</form>

				<OAuth />

				<Link to="/register" className="registerLink">
					Do not have a account? Register
				</Link>
			</div>
		</>
	);
};

export default SignIn;
