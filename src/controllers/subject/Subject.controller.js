import { Subject } from '../../models/index.js';

class SubjectController {
	static getAllSubjects(req, res) {
		res.status(200).send('Get all subjects');
	}

	static getSubjectById(req, res) {
		res.status(200).send('Get subject by id');
	}

	static createSubject(req, res) {
		res.status(201).send('Create subject');
	}

	static updateSubject(req, res) {
		res.status(202).send('Update subject');
	}

	static deleteSubject(req, res) {
		res.status(202).send('Delete subject');
	}
}
export default SubjectController;
