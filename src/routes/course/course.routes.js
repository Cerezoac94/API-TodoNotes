import { Router } from 'express';
import CourseController from '../../controllers/course/Course.controller.js';

const courseRoutes = Router();

courseRoutes.get('/', CourseController.getAllCourses);
courseRoutes.get('/:id', CourseController.getCourseById);
courseRoutes.post('/', CourseController.createCourse);
courseRoutes.put('/', CourseController.updateCourse);
courseRoutes.delete('/', CourseController.deleteCourse);

export default courseRoutes;
