import React from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom';
import ProFastLogo from '../Profast/ProFastLogo';
import useAuth from '../../../hooks/useAuth';
const Navbar = () => {
	const {user,logOut} = useAuth()
	


	const handleLogout = () => {
		logOut()
			.then((result) => {
				console.log(result);
			})
			.catch((error) => console.log(error));
	};
  const navItems = (
		<>
			<li>
				<NavLink to="/">Home</NavLink>
			</li>
			<li>
				<NavLink to="/coverage">Coverage</NavLink>
			</li>
			<li>
				<NavLink to="/about">About Us</NavLink>
			</li>
			<li>
				<NavLink to="/sendparcel">Send A Parcel</NavLink>
			</li>
			<li>
				<NavLink to="/bearider">Be A Rider</NavLink>
			</li>
			{user && (
				<>
					<li>
						<NavLink to="/dashboard">Dashboard</NavLink>
					</li>
				</>
			)}
		</>
	);
	return (
		<div className="navbar bg-gradient-to-r from-slate-200 to-slate-400 shadow-sm rounded-xl">
			<div className="navbar-start">
				<div className="dropdown">
					<div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{" "}
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>{" "}
						</svg>
					</div>
					<ul
						tabIndex={0}
						className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
					>
						{navItems}
					</ul>
				</div>
				<span className=" btn-ghost text-xl">
					<ProFastLogo></ProFastLogo>
				</span>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal px-1">{navItems}</ul>
			</div>

			<div className="navbar-end">
				{user ? (
					<button onClick={handleLogout} className="btn btn-primary text-black">
						Log Out
					</button>
				) : (
					<>
					<Link to="/login" className="btn btn-primary  text-black">
						Login
					</Link>
					
					<Link to="/register" className="btn btn-primary  text-black">
						Register
					</Link>
					</>
					
				)}
			</div>
		</div>
	);
}

export default Navbar