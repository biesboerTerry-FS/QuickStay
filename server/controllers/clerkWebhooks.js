import User from "../models/User.js";
import { Webhook } from "svix";

const clerkWebhooks = async (request, response) => {
	try {
		if (!process.env.CLERK_WEBHOOK_SECRET) {
			console.error("CLERK_WEBHOOK_SECRET is not set");
			return response.status(500).json({
				success: false,
				message: "Webhook secret is not configured",
			});
		}

		const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

		const headers = {
			"svix-id": request.headers["svix-id"],
			"svix-timestamp": request.headers["svix-timestamp"],
			"svix-signature": request.headers["svix-signature"],
		};

		await webhook.verify(JSON.stringify(request.body), headers);

		const { data, type } = request.body;

		const userData = {
			_id: data.id,
			email: data.email_addresses?.[0]?.email_address || "",
			userName: `${data.first_name || ""} ${data.last_name || ""}`.trim() || "QuickStay Guest",
			image: data.image_url || "",
		};

		switch (type) {
			case "user.created": {
				await User.create(userData);
				console.log("User created:", data.id);
				break;
			}
			case "user.updated": {
				await User.findByIdAndUpdate(data.id, userData, { new: true, upsert: true });
				console.log("User updated:", data.id);
				break;
			}
			case "user.deleted": {
				await User.findByIdAndDelete(data.id);
				console.log("User deleted:", data.id);
				break;
			}
			default:
				break;
		}

		return response.status(200).json({
			success: true,
			message: "Webhook received",
		});
	} catch (error) {
		console.error("Webhook error:", error.message);
		return response.status(400).json({
			success: false,
			message: error.message,
		});
	}
};

export default clerkWebhooks;
