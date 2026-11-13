import mongoose from "mongoose";

const connectDB = async () => {
	try {
		mongoose.connection.on("connected", () =>
			console.log("Database Connected, yo")
		);

		const uri = process.env.MONGODB_URI || "";
		if (!uri) {
			throw new Error("MONGODB_URI is not set");
		}

		// MongoDB Atlas URIs already include a database name like ...mongodb.net/dbname?...
		// Only append /quickstay if the path is empty (e.g. mongodb+srv://host/ or mongodb://host/).
		const hasDbName = /\/[^/\s?]+(\?|$)/.test(uri);
		const connectionUri = hasDbName ? uri : `${uri.replace(/\/$/, "")}/quickstay`;

		await mongoose.connect(connectionUri);
	} catch (error) {
		console.error("Database connection failed:", error.message);
		// Don't crash the serverless function; let the request handler return an error.
	}
};

export default connectDB;
