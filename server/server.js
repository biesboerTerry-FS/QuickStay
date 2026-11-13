import express, { request, response } from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkWebhooks from "./controllers/clerkWebhooks.js";

const app = express();

//^ CORS: allow local dev and the configured frontend origin
const allowedOrigin = process.env.CORS_ORIGIN || "http://localhost:5173";
app.use(
	cors({
		origin: allowedOrigin,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
		credentials: true,
	})
);

//^ middleware
app.use(express.json());
app.use(clerkMiddleware());

//^ api to listen for clerk webhooks
app.post("/api/clerk", clerkWebhooks);

app.get("/", (request, response) => response.send("API is working, yo"));
app.get("/health", (request, response) =>
	response.json({ status: "ok", time: new Date().toISOString() })
);

//^ database connection (lazy so serverless cold starts don't crash on import)
let dbConnected = false;
const ensureDB = async () => {
	if (!dbConnected) {
		await connectDB();
		dbConnected = true;
	}
};

//^ local dev entry point
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== "production" || process.env.VERCEL !== "1") {
	ensureDB().then(() => {
		app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	});
}

// Vercel serverless entry point
export default async function handler(request, response) {
	await ensureDB();
	return app(request, response);
}
