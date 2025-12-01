import express from 'express'

const app = express()

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'success' })
})

app.listen(3000, () => {
    console.log("the server is running on the port 3000")
})