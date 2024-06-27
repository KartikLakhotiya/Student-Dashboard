import Student from "../model/studentModel"

export const fetchStudent = async (req, res) => {

    const { username, password } = req.body
    const student = await Student.findOne({ username }).select("-password")
    const isPassCorrect = await bcrypt.compare(password, student?.password || "")
    if (!student || !isPassCorrect) {
        return res.status(400).json({ error: "Invalid studentname or Password." })
    }

    console.log(`Student fetched ${student.email}`)
    console.log(student)
    res.status(201).json({
        _id: student._id,
        firstname: student.firstname,
        lastname: student.lastname,
        username: student.username,
        email: student.email,
        age: student.age,
        city: student.city,
        created: student.createdAt,
        updated: student.updatedAt
    })

}