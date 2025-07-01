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
				path: "myparcel",
				element: <MyParcel></MyParcel>,
			},
			{
				path: "payment/:parcelId",
				element: <Payment></Payment>,
			},
			{
				path: "paymenthistory",
				element: <PaymentHistory></PaymentHistory>
			},
			{
				path: '/track',
				element:<TrackParcel></TrackParcel>
			}
		],
	},
]);
