import { Course, Role, Subject, User } from '../../models/index.js';
import CustomError from '../../utils/CustomError.js';

class CourseController {
	static async getAllCourses(req, res, next) {
		try {
			const courses = await Course.findAll();
			if (!courses.length)
				throw new CustomError(
					'Error en la consulta',
					'No existe ningún curso',
					404
				);
			res.status(200).send({
				success: true,
				message: 'Cursos',
				results: courses,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getCourseById(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			const course = await Course.findByPk(id, {
				include: [
					{
						model: User,
						attributes: ['firstName', 'lastName', 'institutionalId'],
						through: { attributes: [] },
						include: { model: Role, attributes: ['name'] },
					},
					{
						model: Subject,
						attributes: ['id', 'name'],
						through: { attributes: [] },
					},
				],
			});
			if (!course)
				throw new CustomError(
					'Error en la consulta',
					`No existe ningún curso con el id: ${id}`,
					404
				);
			res.status(200).send({
				success: true,
				message: 'Curso',
				results: course,
			});
		} catch (err) {
			next(err);
		}
	}

	static async createCourse(req, res, next) {
		try {
			const { name, schedule, startDate, endDate } = req.body;
			if (!name)
				throw new CustomError(
					'Entrada no válida',
					'El nombre del curso no puede estar vacío',
					400
				);

			const course = await Course.create({
				name,
				schedule,
				startDate,
				endDate,
			});
			if (!course)
				throw new CustomError(
					'Error en el servidor',
					'Algo salió mal, no se pudo crear el curso',
					500
				);
			res.status(201).send({
				success: true,
				message: 'Curso creado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateCourse(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			const { name, schedule, startDate, endDate } = req.body;
			if (!name)
				throw new CustomError(
					'Entrada no válida',
					'El nombre del curso no puede estar vacío',
					400
				);

			const course = await Course.update(
				{
					name,
					schedule,
					startDate,
					endDate,
				},
				{
					where: { id },
				}
			);
			if (!course[0])
				throw new CustomError(
					'Error en la actualización del curso',
					`No se actualizó ningún curso con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Curso actualizado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}

	static async deleteCourse(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError(
					'Entrada no válida',
					'No esta permitido eliminar sin especificar id',
					400
				);
			const course = await Course.destroy({
				where: { id },
			});
			if (!course)
				throw new CustomError(
					'Error en la eliminación del curso',
					`No se eliminó ningún curso con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Curso eliminado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}
	static async addSubjectToCourse(req, res, next) {
		try {
			// admin asignará materias al curso
			// Validar que no esté repetida la materia
		} catch (err) {}
	}
}

export default CourseController;
