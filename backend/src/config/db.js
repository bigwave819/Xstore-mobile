import mongoose from 'mongoose'
import { ENV } from './env.js'

const connectDB = async () => {
    try {
        await mongoose.connect(ENV.DB_URL)
        console.log('connected to the db successfully');
    } catch (error) {
        console.log(`error connecting to the db ${error.message}`)
        process.exit(1)
    }
}

export default connectDB