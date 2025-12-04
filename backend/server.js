import express from "express";
import path from "path";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import cors from "cors";

import { functions, inngest } from "./src/config/inngest.js";

import { ENV } from "./src/config/env.js";
import connectDB from "./src/config/db.js";

import adminRoutes from "./src/routers/admin.route.js";
import userRoutes from "./src/routers/user.route.js";
import orderRoutes from "./src/routers/order.route.js";
import reviewRoutes from "./src/routers/review.route.js";
import productRoutes from "./src/routers/product.route.js";
import cartRoutes from "./src/routers/cart.route.js";

const app = express();

const __dirname = path.resolve();

app.use(express.json());
app.use(clerkMiddleware()); // adds auth object under the req => req.auth
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true })); // credentials: true allows the browser to send the cookies to the server with the request

app.use("/api/inngest", serve({ client: inngest, functions }));

app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Success" });
});

// make our app ready for deployment
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../admin/dist")));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"));
  });
}

const startServer = async () => {
  await connectDB();
  app.listen(ENV.PORT, () => {
    console.log("Server is up and running");
  });
};

startServer();
