import express from 'express';
import { registerStudent, loginStudent, updateStudentProfile } from '../controllers/studentController.js';

const studentRouter = express.Router();

studentRouter.post('/register-student',registerStudent);
studentRouter.post('/login-student',loginStudent);
studentRouter.patch('/update-student/:id', updateStudentProfile);
studentRouter.delete('/delete/:id', deleteStudentProfile);

export default studentRouter;