import express from "express";
import { addStudent } from "../controller/addStudent.js";
import { fetchStudent } from "../controller/fetchStudent.js";
import { fetchAll } from "../controller/allStudents.js";
import { deleteStudent } from "../controller/deleteStudent.js";
import { editStudent } from "../controller/editStudent.js";

const router = express.Router();

router.post('/add', addStudent)
router.post('/fetch', fetchStudent)
router.post('/all', fetchAll)
router.delete('/delete/:id', deleteStudent)
router.post('/edit/:id', editStudent)




export default router