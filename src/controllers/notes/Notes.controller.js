import { Notes } from '../../models/index.js';
import CustomError from '../../utils/CustomError.js';

class NotesController {
	static async getAllNotes(req, res, next) {
		try {
			const notes = await Notes.findAll({
				attributes: ['id', 'title'],
			});
			if (!notes.length)
				throw new CustomError(
					'Error en la consulta',
					'No existe ninguna nota',
					404
				);
			res.status(200).send({ success: true, message: 'Notes', results: notes });
		} catch (err) {
			next(err);
		}
	}
	static async getNoteById(req, res, next) {
		try {
			const { id } = req.params;
			const note = await Notes.findByPk(id, {
				attributes: { exclude: ['idTopic'] },
			});
			if (!note)
				throw new CustomError(
					'Error en la consulta',
					`No existe ninguna nota con el id: ${id}`,
					404
				);
			res.status(200).send({ success: true, message: 'Nota', result: note });
		} catch (err) {
			next(err);
		}
	}

	static async createNote(req, res, next) {
		try {
			const { idTopic } = req.params;
			const { title, text, image } = req.body;
			if (!title || !text)
				throw new CustomError(
					'Entrada no válida',
					'Hay campos necesarios que están vacíos',
					400
				);
			const note = await Notes.create({ title, text, image, idTopic });
			if (!note)
				throw new CustomError(
					'Error en el servidor',
					'Algo salió mal, no se pudo crear la nota',
					500
				);
			res.status(201).send({ success: true, message: 'Nota creada con éxito' });
		} catch (err) {
			next(err);
		}
	}

	static async updateNote(req, res, next) {
		try {
			const { id } = req.params;
			const { title, text, image } = req.body;
			if (!title || !text)
				throw new CustomError(
					'Entrada no válida',
					'Hay campos necesarios que están vacíos',
					400
				);
			const note = await Notes.update(
				{ title, text, image },
				{ where: { id } }
			);
			if (!note[0])
				throw new CustomError(
					'Error en la actualización de la nota',
					`No se actualizó ninguna nota con el id: ${id}`,
					404
				);
			res
				.status(202)
				.send({ success: true, message: 'Nota actualizada con éxito' });
		} catch (err) {
			next(err);
		}
	}

	static async deleteNote(req, res, next) {
		try {
			const { id } = req.params;
			const note = await Notes.destroy({ where: { id } });
			if (!note)
				throw new CustomError(
					'Error en la eliminación de la nota',
					`No se eliminó ninguna nota con el id: ${id}`,
					404
				);
			res
				.status(202)
				.send({ success: true, message: 'Nota eliminada con éxito' });
		} catch (err) {
			next(err);
		}
	}
}

export default NotesController;
