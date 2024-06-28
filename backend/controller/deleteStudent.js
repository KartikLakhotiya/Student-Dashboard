import Student from "../model/studentModel.js";

export const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {

        const student = await Student.findByIdAndDelete(id);
        console.log(`Student deleted ${student.email}`)
        res.status(200).json({ message: 'User Deleted Successfully.' })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}