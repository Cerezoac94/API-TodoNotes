import { Router } from 'express';
import ResourceController from '../../controllers/resource/Resource.controller.js';

const resourceRoute = Router();

resourceRoute.get('/', ResourceController.getAllResources);
resourceRoute.get('/:id', ResourceController.getResourceById);
resourceRoute.post('/', ResourceController.createResource);
resourceRoute.put('/:id', ResourceController.updateResource);
resourceRoute.delete('/:id', ResourceController.deleteResource);

export default resourceRoute;
