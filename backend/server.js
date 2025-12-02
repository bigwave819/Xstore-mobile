import express from 'express'
import { ENV } from './src/config/env.js'
import path from 'path'
import connectDB from './src/config/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from 'inngest/express'
import { functions, inngest } from './src/config/inngest.js'

const app = express();
const __dirname = path.resolve();

connectDB()


app.use(express.json());
app.use(clerkMiddleware());

app.use("/api/inngest", serve({ client: inngest, functions, signingKey: ENV.INNGEST_SIGNIN_KEY }));

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'success' });
});

app.get("/api/test", (req, res) => {
    console.log("Backend Clerk user ID:", req.auth.userId);
    res.json({ ok: true });
});

//make the app ready for the production
if (ENV.NODE_ENV === "production" ) {
  app.use(express.static(path.join(__dirname, "../admin/dist")))
  
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"))
  })
}

app.listen(ENV.PORT, () => {
    console.log(`the server is running on the port ${ENV.PORT}`)
})