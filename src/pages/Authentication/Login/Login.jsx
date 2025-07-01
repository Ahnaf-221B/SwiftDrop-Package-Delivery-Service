import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import useAuth from "../../../hooks/useAuth";
import { toast, Bounce } from "react-toastify";

const Login = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { signIn } = useAuth();
	const location = useLocation();
	const navigate = useNavigate();

	const onSubmit = (data) => {
		signIn(data.email, data.password)
			.then((result) => {
				toast.success("Log in successful", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
				console.log(result.user);
				navigate(`${location.state ? location.state : "/"}`);
			})
			.catch((error) => {
				toast.warn("Invalid mail or password", {
					position: "top-right",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: false,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					theme: "light",
					transition: Bounce,
				});
				console.log(error);
			});
	};

	return (
		<div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
			<div className="card-body">
				<h1 className="text-4xl font-bold">Please Login</h1>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<fieldset className="fieldset">
						<label className="label">Email</label>
						<input
							type="email"
							{...register("email")}
							className="input"
							placeholder="Email"
						/>

						<label className="label">Password</label>
						<input
							type="password"
							{...register("password", {
								required: true,
								minLength: 6,
							})}
							className="input"
							placeholder="Password"
						/>
						{errors.password?.type === "required" && (
							<p className="text-red-500">Password is required</p>
						)}
						{errors.password?.type === "minLength" && (
							<p className="text-red-500">
								Password Must be 6 characters or longer
							</p>
						)}

						<div>
							<a className="link link-hover">Forgot password?</a>
						</div>

						<button className="btn btn-primary text-black mt-4">Login</button>
					</fieldset>
					<p>
						<medium>
							New to this website?{" "}
							<Link className="btn btn-link" to="/register">
								Register
							</Link>
						</medium>
					</p>
				</form>
				<SocialLogin></SocialLogin>
			</div>
		</div>
	);
};

export default Login;
