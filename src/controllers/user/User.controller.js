import { User } from '../../models/index.js';

class UserController {
	static getAllUsers(req, res) {
		res.status(200).send('Get all Users');
	}

	static getUserById(req, res) {
		res.status(200).send('Get user by id');
	}

	static async createUser(req, res, next) {
		try {
			const { firstName, lastName, email, password, idRole } = req.body;

			res.status(201).send('Create user');
		} catch (err) {
			next(err);
		}
	}

	static updateUser(req, res) {
		res.status(202).send('Update user');
	}

	static deleteUser(req, res) {
		res.status(202).send('Delete user');
	}
}

export default UserController;
