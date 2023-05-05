import { Router } from 'express';
import subjectRoutes from './subject/subject.routes.js';
import courseRoutes from './course/course.routes.js';
import userRoutes from './user/user.routes.js';
import roleRoutes from './role/role.routes.js';
import resourceRoute from './resource/resource.routes.js';

const routes = Router();

routes.use('/subject', subjectRoutes);
routes.use('/course', courseRoutes);
routes.use('/user', userRoutes);
routes.use('/role', roleRoutes);
routes.use('/resource', resourceRoute);

export default routes;
