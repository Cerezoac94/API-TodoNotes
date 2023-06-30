import { ResourceType } from '../../models/index.js';
import CustomError from '../../utils/CustomError.js';

class ResourceTypeController {
	static async getAllResourceTypes(req, res, next) {
		try {
			const { idUser } = req.params;
			const resourceType = await ResourceType.findAll({
				attributes: ['id', 'type', 'image'],
				where: { idUser },
			});
			if (!resourceType.length)
				throw new CustomError(
					'Error en la consulta',
					'No existe ningun tipo de recurso',
					404
				);
			res.status(200).send({
				success: true,
				message: 'Tipos de recurso',
				results: resourceType,
			});
		} catch (err) {
			next(err);
		}
	}
	static async getResourceTypeById(req, res, next) {
		try {
			const { id } = req.params;
			const resourceType = await ResourceType.findByPk(id, {
				attributes: ['id', 'type', 'image'],
			});
			if (!resourceType)
				throw new CustomError(
					'Error en la consulta',
					`No existe ningún tipo de recurso con el id: ${id}`,
					404
				);
			res.status(200).send({
				success: true,
				message: 'Tipo de recurso',
				results: resourceType,
			});
		} catch (err) {
			next(err);
		}
	}
	static async createResourceType(req, res, next) {
		try {
			const { idUser } = req.params;
			const { type, image } = req.body;
			if (!type)
				throw new CustomError(
					'Entrada no válida',
					'El nombre del tipo de recurso no puede estar vacío',
					400
				);
			const resourceType = await ResourceType.create({
				type,
				image,
				idUser,
			});
			if (!resourceType)
				throw new CustomError(
					'Error en el servidor',
					'Algo salió mal, no se pudo crear el tipo de recurso',
					500
				);
			res
				.status(201)
				.send({ success: true, message: 'Tipo de recurso creado con éxito' });
		} catch (err) {
			next(err);
		}
	}
	static async updateResourceType(req, res, next) {
		try {
			const { id } = req.params;
			const { type, image } = req.body;
			if (!type)
				throw new CustomError(
					'Entrada no válida',
					'El nombre del tipo de recurso no puede estar vacío',
					400
				);
			const resourceType = await ResourceType.update(
				{
					type,
					image,
				},
				{
					where: { id },
				}
			);
			if (!resourceType[0])
				throw new CustomError(
					'Error en la actualización del tipo de recurso',
					`No se actualizó ningún tipo de recurso con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Tipo de recurso actualizado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}
	static async deleteResourceType(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError(
					'Entrada no válida',
					'No esta permitido eliminar sin especificar id',
					400
				);
			const resourceType = await ResourceType.destroy({
				where: { id },
			});
			if (!resourceType)
				throw new CustomError(
					'Error en la eliminación del tipo de recurso',
					`No se eliminó ningún tipo de recurso con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Tipo de recurso eliminado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}
}

export default ResourceTypeController;
