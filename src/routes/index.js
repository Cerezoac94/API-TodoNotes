import { Router } from 'express';
import userRoutes from './user/user.routes.js';
import categoryRoutes from './category/Category.routes.js';
import topicRoutes from './topic/topic.routes.js';
import resourceRoutes from './resource/resource.routes.js';
import notesRoutes from './notes/notes.routes.js';
import statusRoutes from './status/status.routes.js';
import resourceTypeRoutes from './resourceType/resourceType.routes.js';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/category', categoryRoutes);
routes.use('/topic', topicRoutes);
routes.use('/resource', resourceRoutes);
routes.use('/notes', notesRoutes);
routes.use('/status', statusRoutes);
routes.use('/resource_type', resourceTypeRoutes);

export default routes;
