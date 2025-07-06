import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/Authentication/Login/Login";
import Register from "../pages/Authentication/Register/Register";
import Coverage from "../pages/Coverage/Coverage";
import SendParcel from "../pages/SendParcel/SendParcel";
import PrivateRoute from "../routes/PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";

import Payment from "../pages/Dashboard/Payment/Payment";
import MyParcel from "../pages/Dashboard/MyParcel/MyParcel";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import TrackParcel from "../pages/Dashboard/TrackParcel/TrackParcel";
import BeARider from "../pages/Dashboard/BeARider/BeARider";
import PendingRiders from "../pages/Dashboard/PendingRiders/PendingRiders";
import ActiveRiders from "../pages/Dashboard/ActiveRiders/ActiveRiders";
import MakeAdmin from "../pages/Dashboard/MakeAdmin/MakeAdmin";
import Forbidden from "../pages/Forbidden/forbidden";
import AdminRoute from "../routes/AdminRoute";
import AssignRider from "../pages/Dashboard/AssignRider/AssignRider";
import RiderRoute from "../routes/RiderRoute";
import PendingDeliveries from "../pages/Dashboard/PendingDeliveries/PendingDeliveries";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import MyEarnings from "../pages/Dashboard/MyEarnings/MyEarnings";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";


export const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		children: [
			{
				index: true,
				element: <Home></Home>,
			},
			{
				path: "/coverage",
				element: <Coverage></Coverage>,
				loader: () => fetch("/servicecenter.json"),
			},
			{
				path: "/sendparcel",
				element: (
					<PrivateRoute>
						<SendParcel></SendParcel>
					</PrivateRoute>
				),
				loader: () => fetch("/servicecenter.json"),
			},
			{
				path: "/bearider",
				element: (
					<PrivateRoute>
						<BeARider></BeARider>
					</PrivateRoute>
				),
				loader: () => fetch("/servicecenter.json"),
			},
			{
				path: "/forbidden",
				element: <Forbidden></Forbidden>,
			},
		],
	},
	{
		path: "/",
		element: <AuthLayout></AuthLayout>,
		children: [
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/register",
				element: <Register></Register>,
			},
		],
	},
	{
		path: "/dashboard",
		element: (
			<PrivateRoute>
				<DashboardLayout></DashboardLayout>
			</PrivateRoute>
		),
		children: [
			{
				index: true,
				Component: DashboardHome
			},
			{
				path: "myparcel",
				element: <MyParcel></MyParcel>,
			},
			{
				path: "payment/:parcelId",
				element: <Payment></Payment>,
			},
			{
				path: "paymenthistory",
				element: <PaymentHistory></PaymentHistory>,
			},
			{
				path: "track",
				element: <TrackParcel></TrackParcel>,
			},
			{
				path: "pending-deliveries",
				element: (
					<RiderRoute>
						<PendingDeliveries></PendingDeliveries>
					</RiderRoute>
				),
			},
			{
				path: "completed-deliveries",
				element: (
					<RiderRoute>
						<CompletedDeliveries></CompletedDeliveries>
					</RiderRoute>
				),
			},
			{
				path: "my-earnings",
				element: <RiderRoute><MyEarnings></MyEarnings></RiderRoute>
			},
			{
				path: "assignrider",
				element: <AssignRider></AssignRider>,
			},
			{
				path: "pendingriders",
				element: (
					<AdminRoute>
						<PendingRiders></PendingRiders>
					</AdminRoute>
				),
			},
			{
				path: "activeriders",
				element: (
					<AdminRoute>
						<ActiveRiders></ActiveRiders>
					</AdminRoute>
				),
			},
			{
				path: "makeadmin",
				element: (
					<AdminRoute>
						{" "}
						<MakeAdmin></MakeAdmin>
					</AdminRoute>
				),
			},
		],
	},
]);
