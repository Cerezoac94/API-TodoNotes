import {
	Category,
	Notes,
	Resource,
	Status,
	Topic,
} from '../../models/index.js';
import CustomError from '../../utils/CustomError.js';

class CategoryController {
	static async getAllCategories(req, res, next) {
		try {
			const categories = await Category.findAll({
				attributes: ['id', 'name'],
			});
			if (!categories.length)
				throw new CustomError(
					'Error en la consulta',
					'No existe ninguna categoría',
					404
				);
			res.status(200).send({
				success: true,
				message: 'Categorías',
				results: categories,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getCategoryById(req, res, next) {
		try {
			const { id } = req.params;
			const category = await Category.findByPk(id, {
				atrtributes: { exclude: ['idUser'] },
				include: {
					model: Topic,
					attributes: { exclude: ['idStatus'] },
					through: { atrtributes: [] },
					include: [
						{ model: Status },
						{ model: Resource, attributes: ['id', 'title'] },
						{ model: Notes, attributes: ['id', 'title'] },
					],
				},
			});
			if (!category)
				throw new CustomError(
					'Error en la consulta',
					`No existe ninguna categoría con el id: ${id}`,
					404
				);
			res.status(200).send({
				success: true,
				message: 'Categoría',
				results: category,
			});
		} catch (err) {
			next(err);
		}
	}

	static async createCategory(req, res, next) {
		try {
			const { idUser } = req.params;
			const { name, description } = req.body;
			if (!name)
				throw new CustomError(
					'Entrada no válida',
					'El nombre de la categoría no puede estar vacío',
					400
				);

			const category = await Category.create({
				name,
				description,
				idUser,
			});
			if (!category)
				throw new CustomError(
					'Error en el servidor',
					'Algo salió mal, no se pudo crear la categoría',
					500
				);
			res.status(201).send({
				success: true,
				message: 'Categoría creada con éxito',
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateCategory(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			const { name, description } = req.body;
			if (!name)
				throw new CustomError(
					'Entrada no válida',
					'El nombre de la categoría no puede estar vacío',
					400
				);

			const category = await Category.update(
				{
					name,
					description,
				},
				{
					where: { id },
				}
			);
			if (!category[0])
				throw new CustomError(
					'Error en la actualización de la categoría',
					`No se actualizó ninguna categoría con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Categoría actualizada con éxito',
			});
		} catch (err) {
			next(err);
		}
	}

	static async deleteCategory(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError(
					'Entrada no válida',
					'No esta permitido eliminar sin especificar id',
					400
				);
			const category = await Category.destroy({
				where: { id },
			});
			if (!category)
				throw new CustomError(
					'Error en la eliminación de la categoría',
					`No se eliminó ninguna categoría con el id: ${id}`,
					404
				);
			res.status(202).send({
				success: true,
				message: 'Categoría eliminada con éxito',
			});
		} catch (err) {
			next(err);
		}
	}
}

export default CategoryController;
