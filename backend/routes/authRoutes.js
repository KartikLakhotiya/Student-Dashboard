import express from "express";
import { addStudent } from "../controller/addStudent.js";
import { fetchStudent } from "../controller/fetchStudent.js";
import { fetchAll } from "../controller/allStudents.js";

const router = express.Router();

router.post('/add', addStudent)
router.post('/fetch', fetchStudent)
router.post('/all', fetchAll)




export default router