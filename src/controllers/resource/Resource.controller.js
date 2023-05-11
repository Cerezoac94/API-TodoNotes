import { Subject } from '../../models/index.js';
import { Resource } from '../../models/index.js';
import CustomError from '../../utils/CustomError.js';

class ResourceController {
	static async getAllResources(req, res, next) {
		try {
			const resources = await Resource.findAll({
				attributes: { exclude: ['idSubject'] },
				include: { model: Subject, attributes: ['id', 'name'] },
			});
			if (!resources.length)
				throw new CustomError(
					'Error en la consulta',
					'No existe ningún recurso',
					404
				);
			res.status(200).send({
				success: true,
				message: 'Recursos',
				result: resources,
			});
		} catch (err) {
			next(err);
		}
	}
	static async getResourceById(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			const resource = await Resource.findByPk(id, {
				attributes: { exclude: ['idSubject'] },
				include: { model: Subject, attributes: ['id', 'name'] },
			});
			if (!resource)
				throw new CustomError(
					'Error en la consulta',
					`No existe ningún recurso con el id ${id}`,
					404
				);
			res.status(200).send({
				success: true,
				message: 'Recurso',
				result: resource,
			});
		} catch (err) {
			next(err);
		}
	}
	static async createResource(req, res, next) {
		try {
			const { type, description, url, idSubject } = req.body;
			if (!type)
				throw new CustomError(
					'Entrada no válida',
					'El tipo de recurso no puede estar vacío',
					400
				);
			const resource = await Resource.create({
				type,
				description,
				url,
				idSubject,
			});
			if (!resource)
				throw new CustomError(
					'Error en el servidor',
					'Algo salió mal, no se pudo crear el recurso',
					500
				);
			res.status(201).send({
				success: true,
				message: 'Recurso creado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}
	static async updateResource(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			const { type, description, url, idSubject } = req.body;
			if (!type)
				throw new CustomError(
					'Entrada no válida',
					'El tipo de recurso no puede estar vacío',
					400
				);
			const resource = await Resource.update(
				{
					type,
					description,
					url,
					idSubject,
				},
				{
					where: { id },
				}
			);
			if (!resource[0])
				throw new CustomError(
					'Error en la actualización del recurso',
					`No se actualizó ningún recurso con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Recurso actualizado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}
	static async deleteResource(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError(
					'Entrada no válida',
					'No esta permitido eliminar sin especificar id',
					400
				);
			const resource = await Resource.destroy({
				where: { id },
			});
			if (!resource)
				throw new CustomError(
					'Error en la eliminación del recurso',
					`No se eliminó ningún recurso con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Recurso eliminado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}
}

export default ResourceController;
