import { Inngest } from "inngest";
import connectDB from './db'

export const inngest = new Inngest({ id: "ecommerce-app" });

const syncUser = inngest.createFunction(
    { id: "sync-user" },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        await connectDB()
        const { id, email_addresses, first_name, last_name, image_url } = event.data
        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}` || "User",
            imageUrl: image_url,
            addresses: [],
            wishlist: []
        }
    }
)

const deleteUserFromDB = inngest.createFunction(
    { id: "sync-user" },
    { event: 'clerk/user.created' },
    async ({ event }) => {
        await connectDB()

        const { id } = event.data
        await User.deleteOne({ clerkId: id })
    }
)

export const functions = [syncUser, deleteUserFromDB];