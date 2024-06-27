import Student from "../model/studentModel.js"
import bcrypt from 'bcrypt'

export const fetchStudent = async (req, res) => {

    const { username, password } = req.body
    const student = await Student.findOne({ username })
    const isPassCorrect = await bcrypt.compare(password, student?.password || "")
    if (!student || !isPassCorrect) {
        return res.status(400).json({ error: "Invalid username or Password." })
    }

    console.log(`Student fetched ${student.email}`)
    res.status(201).json({
        _id: student._id,
        fullname: student.fullname,
        username: student.username,
        email: student.email,
        course: student.course,
        created: student.createdAt,
        updated: student.updatedAt
    })

}