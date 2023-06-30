import { Status } from '../../models/index.js';
import CustomError from '../../utils/CustomError.js';

class StatusController {
	static async getAllStatus(req, res, next) {
		try {
			const { idUser } = req.params;
			const status = await Status.findAll({
				attributes: ['id', 'status'],
				where: {
					idUser,
				},
			});
			if (!status.length)
				throw new CustomError(
					'Error en la consulta',
					'No existe ningun estado',
					404
				);
			res
				.status(200)
				.send({ success: true, message: 'Estados', results: status });
		} catch (err) {
			next(err);
		}
	}
	static async getStatusById(req, res, next) {
		try {
			const { id } = req.params;
			const status = await Status.findByPk(id, {
				attributes: ['id', 'status'],
			});
			if (!status)
				throw new CustomError(
					'Error en la consulta',
					`No existe ningún estado con el id: ${id}`,
					404
				);
			res
				.status(200)
				.send({ success: true, message: 'Estado', results: status });
		} catch (err) {
			next(err);
		}
	}
	static async createStatus(req, res, next) {
		try {
			const { idUser } = req.params;
			const { name } = req.body;
			if (!name)
				throw new CustomError(
					'Entrada no válida',
					'El nombre del estado no puede estar vacío',
					400
				);
			const createStatus = await Status.create({
				status: name,
				idUser,
			});
			if (!createStatus)
				throw new CustomError(
					'Error en el servidor',
					'Algo salió mal, no se pudo crear el estado',
					500
				);
			res
				.status(201)
				.send({ success: true, message: 'Estado creado con éxito' });
		} catch (err) {
			next(err);
		}
	}
	static async updateStatus(req, res, next) {
		try {
			const { id } = req.params;
			const { name } = req.body;
			if (!name)
				throw new CustomError(
					'Entrada no válida',
					'El nombre del estado no puede estar vacío',
					400
				);
			const status = await Status.update(
				{
					status: name,
				},
				{
					where: { id },
				}
			);
			if (!status[0])
				throw new CustomError(
					'Error en la actualización del estado',
					`No se actualizó ningún estado con el id: ${id}`,
					404
				);
			res
				.status(202)
				.send({ success: true, message: 'Estado actualizado con éxito' });
		} catch (err) {
			next(err);
		}
	}
	static async deleteStatus(req, res, next) {
		try {
			const { id } = req.params;
			// error atajado por precaución, no es necesario en nuestra lógica
			if (!id)
				throw new CustomError(
					'Entrada no válida',
					'No esta permitido eliminar sin especificar id',
					400
				);
			const status = await Status.destroy({
				where: { id },
			});
			if (!status)
				throw new CustomError(
					'Error en la eliminación del estado',
					`No se eliminó ningún estado con el id: ${id}`,
					404
				);
			res
				.status(202)
				.send({ success: true, message: 'Estado eliminado con éxito' });
		} catch (err) {
			next(err);
		}
	}
}

export default StatusController;
