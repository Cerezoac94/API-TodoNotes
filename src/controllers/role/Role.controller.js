import { Role } from '../../models/index.js';
import CustomError from '../../utils/CustomError.js';

class RoleController {
	static async getAllRoles(req, res, next) {
		try {
			const roles = await Role.findAll({
				attributes: ['id', 'name'],
			});
			if (!roles.length)
				throw new CustomError(
					'Error en la consulta',
					'No existe ningún rol',
					404
				);
			res.status(200).send({
				success: true,
				message: 'Roles',
				results: roles,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getRoleById(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			const role = await Role.findOne({
				where: { id },
			});
			if (!role)
				throw new CustomError(
					'Error en la consulta',
					`No existe ningún rol con el id: ${id}`,
					404
				);
			res.status(200).send({
				success: true,
				message: 'Role',
				results: role,
			});
		} catch (err) {
			next(err);
		}
	}

	static async createRole(req, res, next) {
		try {
			const { name, description } = req.body;
			if (!name)
				throw new CustomError(
					'Entrada no válida',
					'El nombre del rol no puede estar vacío',
					400
				);

			const role = await Role.create({
				name,
				description,
			});
			if (!role)
				throw new CustomError(
					'Error en el servidor',
					'Algo salió mal, no se pudo crear el rol',
					500
				);
			res.status(201).send({
				success: true,
				message: 'Rol creado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateRole(req, res, next) {
		try {
			const { id } = req.params;
			const { name, description } = req.body;
			if (!id) {
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			} else if (!name) {
				throw new CustomError(
					'Entrada no válida',
					'El nombre del rol no puede estar vacío',
					400
				);
			}
			const role = await Role.update(
				{
					name,
					description,
				},
				{ where: { id } }
			);
			if (!role[0])
				throw new CustomError(
					'Error en la actualización del rol',
					`No se actualizó ningún rol con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Rol actualizado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}

	static async deleteRole(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError(
					'Entrada no válida',
					'No esta permitido eliminar sin especificar id',
					400
				);
			const role = await Role.destroy({
				where: { id },
			});
			if (!role)
				throw new CustomError(
					'Error en la eliminación del rol',
					`No se eliminó ningún rol con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Rol eliminado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}
}

export default RoleController;
