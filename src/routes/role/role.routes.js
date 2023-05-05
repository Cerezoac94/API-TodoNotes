import { Router } from 'express';
import RoleController from '../../controllers/role/Role.controller.js';

const roleRoutes = Router();

roleRoutes.get('/', RoleController.getAllRoles);
roleRoutes.get('/:id', RoleController.getRoleById);
roleRoutes.post('/', RoleController.createRole);
roleRoutes.put('/:id', RoleController.updateRole);
roleRoutes.delete('/:id', RoleController.deleteRole);

export default roleRoutes;
