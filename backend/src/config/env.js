import dotenv from "dotenv"

dotenv.config({ quiet: true })


export const ENV = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    INNGEST_SIGNIN_KEY: process.env.INNGEST_SIGNIN_KEY,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    CLIENT_URL: process.env.CLIENT_URL
}