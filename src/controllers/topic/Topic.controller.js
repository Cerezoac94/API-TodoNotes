import { Topic } from '../../models/index.js';
import CustomError from '../../utils/CustomError.js';

class TopicController {
	static async getAllTopics(req, res, next) {
		try {
			// where id(/me) = idUser(model category)  para solo buscar los topicos de cada usuario
			const topics = await Topic.findAll();
			if (!topics.length)
				throw new CustomError(
					'Error en la consulta',
					'No existe ningún tópico',
					404
				);
			res.status(200).send({
				success: true,
				message: 'Topics',
				results: topics,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getTopicById(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			const topic = await Topic.findByPk(
				id
				//
			);
			if (!topic)
				throw new CustomError(
					'Error en la consulta',
					`No existe ningún tópico con el id: ${id}`,
					404
				);
			res.status(200).send({
				success: true,
				message: 'Tópico',
				results: topic,
			});
		} catch (err) {
			next(err);
		}
	}

	static async createTopic(req, res, next) {
		try {
			const { name, description, image, idStatus } = req.body;
			if (!name)
				throw new CustomError(
					'Entrada no válida',
					'El nombre del tópico no puede estar vacío',
					400
				);

			const topic = await Topic.create({
				name,
				description,
				// creationDate: new Date(),
				image,
				idStatus,
			});
			if (!topic)
				throw new CustomError(
					'Error en el servidor',
					'Algo salió mal, no se pudo crear el tópico',
					500
				);
			res.status(201).send({
				success: true,
				message: 'Tópico creado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateTopic(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			const { name, description, image, idStatus } = req.body;
			if (!name)
				throw new CustomError(
					'Entrada no válida',
					'El nombre del tópico no puede estar vacío',
					400
				);
			const topic = await Topic.update(
				{
					name,
					description,
					image,
					idStatus,
				},
				{
					where: { id },
				}
			);
			if (!topic[0])
				throw new CustomError(
					'Error en la actualización del tópico',
					`No se actualizó ningún tópico con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Tópico actualizado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}

	static async deleteTopic(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError(
					'Entrada no válida',
					'No esta permitido eliminar sin especificar id',
					400
				);
			const topic = await Topic.destroy({
				where: { id },
			});
			if (!topic)
				throw new CustomError(
					'Error en la eliminación del tópico',
					`No se eliminó ningún tópico con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Tópico eliminado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}
}
export default TopicController;
