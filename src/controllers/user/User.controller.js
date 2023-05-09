import { Course, Role, User } from '../../models/index.js';
import CustomError from '../../utils/CustomError.js';
import institutionalId from '../../utils/institutionalId.js';

class UserController {
	static async getAllUsers(req, res, next) {
		try {
			// mediante la ruta, enviaré el param del rol a buscar, usando este mismo controlador, al buscar por students, enviaré como value el param students, y para teachers, param teacher
			const { role } = req.params;
			if (!role)
				throw new CustomError(
					'Entrada no válida',
					'Busqueda de usuario incorrecta',
					400
				);
			const typeRole = {
				students: 3,
				teachers: 2,
			};
			const users = await User.findAll({
				attributes: ['id', 'firstName', 'lastName', 'email', 'institutionalId'],
				where: {
					idRole: typeRole[role],
				},
			});

			if (!users.length)
				throw new CustomError(
					'Error en la consulta',
					'No existe ningún estudiante',
					404
				);

			res.status(200).send({
				success: true,
				message: 'Users',
				results: users,
			});
		} catch (err) {
			next(err);
		}
	}

	static async getUserById(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			const user = await User.findByPk(id, {
				attributes: { exclude: ['password', 'salt', 'idRole'] },
				include: [
					{ model: Role, attributes: ['name'] },
					{
						model: Course,
						attributes: ['id', 'name'],
						through: { attributes: [] },
					},
				],
			});
			if (!user)
				throw new CustomError(
					'Error en la consulta',
					`No existe ningún usuario con el id: ${id}`,
					404
				);
			res.status(200).send({
				success: true,
				message: 'User',
				results: user,
			});
		} catch (err) {
			next(err);
		}
	}

	static async createUser(req, res, next) {
		try {
			const { firstName, lastName, email, password, idRole = 3 } = req.body;
			if (!firstName || !lastName || !email || !password)
				throw new CustomError(
					'Entrada no válida',
					'Hay campos necesarios que están vacíos',
					400
				);

			const user = await User.create({
				firstName,
				lastName,
				email,
				password,
				idRole,
			});

			if (!user)
				throw new CustomError(
					'Error en el servidor',
					'Algo salió mal, no se pudo crear el usuario',
					500
				);

			await user.update({
				institutionalId: institutionalId(user.id, user.idRole),
			});
			//TODO: Capturar error para matricula

			res.status(201).send({
				success: true,
				message: 'Usuario creado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}

	static async updateUser(req, res, next) {
		try {
			const { id } = req.params;
			const { firstName, lastName, email, phone } = req.body;
			if (!id) {
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			}
			if (!firstName || !lastName || !email) {
				throw new CustomError(
					'Entrada no válida',
					'Hay campos necesarios vacíos',
					400
				);
			}
			const user = await User.update(
				{
					firstName,
					lastName,
					email,
					phone,
				},
				{
					where: { id },
				}
			);
			if (!user[0])
				throw new CustomError(
					'Error en la actualización del usuario',
					`No se actualizó ningún usuario con el id: ${id}`,
					400
				);
			res.status(202).send({
				success: true,
				message: 'Usuario actualizado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}

	static async deleteUser(req, res, next) {
		try {
			const { id } = req.params;
			if (!id)
				throw new CustomError(
					'Entrada no válida',
					'No esta permitido eliminar sin especificar id',
					400
				);
			const user = await User.destroy({
				where: { id },
			});
			if (!user)
				throw new CustomError(
					'Error en la eliminación del usuario',
					`No se eliminó ningún usuario con el id: ${id}`,
					400
				);
			res.status(202).send({
				success: true,
				message: 'Usuario eliminado con éxito',
			});
		} catch (err) {
			next(err);
		}
	}
}

export default UserController;
