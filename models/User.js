import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: { type: 'string', required: true },
    email: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    registrationDate: { type: Date, default: Date.now }
})

const User = mongoose.model('User', userSchema)
export default User

