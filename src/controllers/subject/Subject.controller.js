import { Resource, Subject } from '../../models/index.js';
import CustomError from '../../utils/CustomError.js';

class SubjectController {
	static async getAllSubjects(req, res, next) {
		try {
			const subjects = await Subject.findAll();
			if (!subjects.length)
				throw new CustomError(
					'Error en la consulta',
					'No existe ninguna materia',
					404
				);
			res.status(200).send({
				success: true,
				message: 'Subjects',
				results: subjects,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getSubjectById(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			const subject = await Subject.findByPk(id, {
				include: {
					model: Resource,
					attributes: ['type', 'url'],
				},
			});
			if (!subject)
				throw new CustomError(
					'Error en la consulta',
					`No existe ninguna materia con el id: ${id}`,
					404
				);
			res.status(200).send({
				success: true,
				message: 'Materia',
				results: subject,
			});
		} catch (err) {
			next(err);
		}
	}

	static async createSubject(req, res, next) {
		try {
			const { name, description } = req.body;
			if (!name)
				throw new CustomError(
					'Entrada no válida',
					'El nombre de la materia no puede estar vacía',
					400
				);

			const subject = await Subject.create({
				name,
				description,
			});
			if (!subject)
				throw new CustomError(
					'Error en el servidor',
					'Algo salió mal, no se pudo crear la materia',
					500
				);
			res.status(201).send({
				success: true,
				message: 'Materia creada con éxito',
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateSubject(req, res, next) {
		try {
			res.status(202).send('Update subject');
		} catch (err) {
			next(err);
		}
	}

	static async deleteSubject(req, res, next) {
		try {
			res.status(202).send('Delete subject');
		} catch (err) {
			next(err);
		}
	}
}
export default SubjectController;
