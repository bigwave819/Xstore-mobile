import express from 'express'
import { ENV } from './src/config/env'
import path from 'path'
import connectDB from './src/config/db'
import { clerkMiddleware } from '@clerk/express'
import { serve } from 'inngest/express'
import { functions, inngest } from './src/config/inngest'

const app = express()

import { clerkMiddleware } from '@clerk/express'

app.use(express.json())
app.use(clerkMiddleware())
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'success' })
})

//make the app ready for the production
if (ENV.NODE_ENV = "production" ) {
  app.use(express.static(path.join(__dirname, "../admin/dist")))
  
  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"))
  })
}

app.listen(ENV.PORT, () => {
    console.log("the server is running on the port 3000")
    connectDB()
})