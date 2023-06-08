import { ResourceType } from '../../models/index.js';

class ResourceTypeController {
	static async getAllResourceTypes(req, res, next) {
		try {
			res.status(200).send({ success: true });
		} catch (err) {
			next(err);
		}
	}
	static async getResourceTypeById(req, res, next) {
		try {
			res.status(200).send({ success: true });
		} catch (err) {
			next(err);
		}
	}
	static async createResourceType(req, res, next) {
		try {
			res.status(201).send({ success: true });
		} catch (err) {
			next(err);
		}
	}
	static async updateResourceType(req, res, next) {
		try {
			res.status(202).send({ success: true });
		} catch (err) {
			next(err);
		}
	}
	static async deleteResourceType(req, res, next) {
		try {
			res.status(202).send({ success: true });
		} catch (err) {
			next(err);
		}
	}
}

export default ResourceTypeController;
