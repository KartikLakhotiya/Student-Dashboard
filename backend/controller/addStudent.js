import bcrypt from 'bcrypt'
import Student from '../model/studentModel.js';

export const addStudent = async (req, res) => {

    try {

        const { fullname, username, email, password, course } = req.body;

        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const newStudent = new Student({
            fullname,
            username,
            email,
            password: hashedPassword,
            course
        })

        if (newStudent) {
            await newStudent.save();
            console.log(`Student created ${newStudent.email}`);
            res.status(201).json({
                _id: newStudent._id,
                fullname: newStudent.fullname,
                username: newStudent.username,
                email: newStudent.email,
                course: newStudent.course,
                created: newStudent.createdAt,
                updated: newStudent.updatedAt
            })

        }

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }

}