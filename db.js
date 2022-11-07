import mongoose from 'mongoose'

const dbConnection = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODBURI)
        console.log(`Db runs in ${conn.connection.host}`)
    } catch {
        process.exit(1)
    }
}

export default dbConnection

