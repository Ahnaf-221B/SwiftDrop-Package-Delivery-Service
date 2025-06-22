import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
AOS.init();

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<div className="max-w-7xl mx-auto">
			<AuthProvider>
				<RouterProvider router={router}></RouterProvider>
			</AuthProvider>
		</div>
	</StrictMode>
);
