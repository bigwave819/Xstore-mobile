import { v2 as cloudinary } from 'cloudinary'
import { ENV } from './env'

cloudinary.config({
    cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET
})

export default cloudinary