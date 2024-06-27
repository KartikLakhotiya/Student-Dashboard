import express from "express";
import { addStudent } from "../controller/addStudent.js";
import { fetchStudent } from "../controller/fetchStudent.js";

const router = express.Router();

router.post('/add', addStudent)
router.post('/fetch', fetchStudent)


export default router