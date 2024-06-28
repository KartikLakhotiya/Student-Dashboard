import Student from "../model/studentModel.js";

export const fetchAll = async (req, res) => {
    try {
        const allUsers = await Student.find().select('-password');
        const count = await Student.countDocuments()
        res.status(201).json(allUsers);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}