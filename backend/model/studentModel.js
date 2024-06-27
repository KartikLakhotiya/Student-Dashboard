import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    course: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Student = mongoose.model('Student', studentSchema)

export default Student;