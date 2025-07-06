import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import useTrackingLogger from "../../../hooks/useTrackingLogger";

const Paymentform = () => {
	const stripe = useStripe();
	const elements = useElements();
	const axiosSecure = useAxiosSecure();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { parcelId } = useParams();
	const { logTracking } = useTrackingLogger();
	console.log(parcelId);

	const [error, setError] = useState("");

	const { isPending, data: parcelInfo = {} } = useQuery({
		queryKey: ["parcels", parcelId],
		queryFn: async () => {
			const res = await axiosSecure.get(`/parcels/${parcelId}`);
			return res.data;
		},
	});

	if (isPending) {
		return "...loading";
	}

	console.log(parcelInfo);

	const amount = parcelInfo.cost;
	const amountInCents = amount * 100;
	console.log(amountInCents);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) {
			return;
		}
		const card = elements.getElement(CardElement);
		if (card == null) {
			return;
		}
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card,
		});

		if (error) {
			setError(error.message);
		} else {
			setError("");
			console.log("[PaymentMethod]", paymentMethod);

			const res = await axiosSecure.post("/create-payment-intent", {
				amountInCents,
				parcelId,
			});
			const clientSecret = res.data.clientSecret;

			const result = await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: elements.getElement(CardElement),
					billing_details: {
						name: user.displayName,
						email: user.email,
					},
				},
			});
			if (result.error) {
				console.log(result.error.message);
			} else {
				if (result.paymentIntent.status === "succeeded") {
					console.log("paymnet succeeded");
					const transactionId = result.paymentIntent.id;

					const paymentData = {
						parcelId,
						email: user.email,
						amount,
						transactionId: transactionId,
						paymentMethod: result.paymentIntent.payment_method_types,
					};
					const paymentRes = await axiosSecure.post("/payments", paymentData);
					if (paymentRes.data.insertedId) {
						await Swal.fire({
							icon: "success",
							title: "Payment Successful!",
							html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
							confirmButtonText: "Go to My Parcels",
						});

						await logTracking({
							tracking_id: parcelInfo.tracking_id,
							status: "payment_done",
							details: `Paid by ${user.displayName}`,
							updated_by: user.email,
						});
						
						navigate("/dashboard/myparcel");
					}
				}
			}
		}
	};
	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
		>
			<CardElement
				className="p-2 border rounded"
				options={{
					hidePostalCode: true,
				}}
			></CardElement>
			<button
				type="submit"
				disabled={!stripe}
				className="btn btn-primary text-white w-full"
			>
				Pay ${amount}
			</button>
			{error && <p className="text-red-500">{error}</p>}
		</form>
	);
};

export default Paymentform;
