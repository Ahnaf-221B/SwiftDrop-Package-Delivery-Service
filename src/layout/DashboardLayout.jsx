import React from "react";
import { NavLink, Outlet } from "react-router";
import ProFastLogo from "../pages/Shared/Profast/ProFastLogo";
import {
	FaHome,
	FaBoxOpen,
	FaMoneyCheckAlt,
	FaUserEdit,
	FaSearchLocation,
	FaUserClock,
	FaUserCheck,
	FaUserShield,
	FaMotorcycle,
	FaTasks,
	FaCheckCircle,
	FaWallet,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {

	const {role, roleLoading} =useUserRole();

	console.log(role);
	
	return (
		<div className="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
			<div className="drawer-content flex flex-col ">
				{/* Navbar */}
				<div className="navbar bg-base-300 w-full lg:hidden">
					<div className="flex-none ">
						<label
							htmlFor="my-drawer-2"
							aria-label="open sidebar"
							className="btn btn-square btn-ghost"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block h-6 w-6 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								></path>
							</svg>
						</label>
					</div>
					<div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
				</div>

				<Outlet></Outlet>

				{/* Page content here */}

				{/* Page content here */}
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-2"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
					{/* Sidebar content here */}
					<ProFastLogo></ProFastLogo>
					<li>
						<NavLink to="/">
							{" "}
							<FaHome className="inline-block mr-2" />
							Home
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/myparcel">
							{" "}
							<FaBoxOpen className="inline-block mr-2" />
							My Parcels
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/paymenthistory">
							{" "}
							<FaMoneyCheckAlt className="inline-block mr-2" />
							Paymnet History
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/track">
							{" "}
							<FaSearchLocation className="inline-block mr-2" />
							Track a Package
						</NavLink>
					</li>
					<li>
						<NavLink to="/dashboard/profile">
							{" "}
							<FaUserEdit className="inline-block mr-2" />
							Update Profile
						</NavLink>
					</li>

					{!roleLoading && role === "rider" && (
						<>
							<li>
								<NavLink to="/dashboard/pending-deliveries">
									<FaTasks className="inline-block mr-2" />
									Pending Deliveries
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/completed-deliveries">
									<FaCheckCircle className="inline-block mr-2" />
									Completed Deliveries
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/my-earnings">
									<FaWallet className="inline-block mr-2" />
									My Earnings
								</NavLink>
							</li>
						</>
					)}

					{!roleLoading && role === "admin" && (
						<>
							<li>
								<NavLink to="/dashboard/assignrider">
									<FaMotorcycle className="inline-block mr-2" />
									Assign Rider
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/activeriders">
									<FaUserCheck className="inline-block mr-2" />
									Active Riders
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/pendingriders">
									<FaUserClock className="inline-block mr-2" />
									Pending Riders
								</NavLink>
							</li>
							<li>
								<NavLink to="/dashboard/makeadmin">
									<FaUserShield className="inline-block mr-2" />
									Make Admin
								</NavLink>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
};

export default DashboardLayout;
