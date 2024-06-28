import Student from "../model/studentModel.js";

export const editStudent = async (req, res) => {
    let { fullname, username, email, course } = req.body;
    try {

        const student = await Student.findById(req.params.id)
        if (fullname === "") fullname = student.fullname
        if (username === "") username = student.username
        if (email === "") email = student.email
        if (course === "") course = student.course

        if (!student) {
            return res.status(404).json({ message: 'Student not found' })
        }

        student.fullname = fullname;
        student.username = username;
        student.email = email;
        student.course = course;

        await student.save();
        console.log(`Student edited ${student.email}`)
        res.json(student);

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
    }
}