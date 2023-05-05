import { Resource } from '../../models/index.js';

class ResourceController {
	static getAllResources(req, res) {
		res.status(200).send('Get all resources');
	}
	static getResourceById(req, res) {
		res.status(200).send('Get resource by id');
	}
	static createResource(req, res) {
		res.status(201).send('Create resource');
	}
	static updateResource(req, res) {
		res.status(202).send('Update resource');
	}
	static deleteResource(req, res) {
		res.status(202).send('Delete resource');
	}
}

export default ResourceController;
