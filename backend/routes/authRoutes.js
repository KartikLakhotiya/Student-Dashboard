import express from "express";
import { addStudent } from "../controller/addStudent.js";

const router = express.Router();

router.post('/add', addStudent)

export default router