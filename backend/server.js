import express from "express";
import { ENV } from "./src/config/env.js";
import path from "path";
import connectDB from "./src/config/db.js";

// 🟢 Clerk MUST come AFTER Inngest
import { clerkMiddleware } from "@clerk/express";

// 🟢 Inngest webhook must receive RAW body BEFORE Clerk touches it
import { serve } from "inngest/express";
import { functions, inngest } from "./src/config/inngest.js";

// Routes
import adminRoutes from "./src/routers/admin.route.js";
import userRoutes from "./src/routers/user.route.js";
import orderRoutes from "./src/routers/order.route.js";
import reviewRoutes from "./src/routers/review.route.js";
import productRoutes from "./src/routers/product.route.js";
import cartRoutes from "./src/routers/cart.route.js";

import cors from "cors";

const app = express();
const __dirname = path.resolve();

// Connect to MongoDB
connectDB();

// Allow JSON for normal endpoints (NOT for Inngest)
app.use(express.json());

// CORS
app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

/* 
|--------------------------------------------------------------------------
| 🟣 INNGEST WEBHOOK — MUST BE FIRST
| Does NOT use clerkMiddleware
|--------------------------------------------------------------------------
*/
app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
    signingKey: ENV.INNGEST_SIGNING_KEY, // ← FIXED
  })
);

/* 
|--------------------------------------------------------------------------
| 🟢 Clerk After Inngest
|--------------------------------------------------------------------------
*/
app.use(clerkMiddleware());

/* 
|--------------------------------------------------------------------------
| 🟢 API Routes
|--------------------------------------------------------------------------
*/
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

/*
|--------------------------------------------------------------------------
| Health Route
|--------------------------------------------------------------------------
*/
app.get("/health", (req, res) => {
  res.status(200).json({ message: "success" });
});

/* 
|--------------------------------------------------------------------------
| 🟢 Production Mode (Admin Panel Deployment)
|--------------------------------------------------------------------------
*/
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin/dist/index.html"));
  });
}

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/
app.listen(ENV.PORT, () => {
  console.log(`🚀 Server running on port ${ENV.PORT}`);
});
