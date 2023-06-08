import { Router } from 'express';
import ResourceTypeController from '../../controllers/resourceType/ResourceType.controller.js';

const resourceTypeRoutes = Router();

resourceTypeRoutes.get('/', ResourceTypeController.getAllResourceTypes);
resourceTypeRoutes.get('/:id', ResourceTypeController.getResourceTypeById);
resourceTypeRoutes.post('/', ResourceTypeController.createResourceType);
resourceTypeRoutes.put('/:id', ResourceTypeController.updateResourceType);
resourceTypeRoutes.delete('/:id', ResourceTypeController.deleteResourceType);

export default resourceTypeRoutes;
