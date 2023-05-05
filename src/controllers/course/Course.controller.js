import { Course } from '../../models/index.js';

class CourseController {
	static getAllCourses(req, res) {
		res.status(200).send('Get all courses');
	}

	static getCourseById(req, res) {
		res.status(200).send('Get course by id');
	}

	static createCourse(req, res) {
		res.status(201).send('Create course');
	}

	static updateCourse(req, res) {
		res.status(202).send('Update course');
	}

	static deleteCourse(req, res) {
		res.status(202).send('Delete course');
	}
}

export default CourseController;
