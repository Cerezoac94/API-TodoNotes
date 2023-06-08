import { User } from '../../models/index.js';
import CustomError from '../../utils/CustomError.js';

class UserController {
	static async getAllUsers(req, res, next) {
		try {
			const users = await User.findAll({
				attributes: ['id', 'userName', 'firstName', 'lastName'],
			});

			if (!users.length)
				throw new CustomError(
					'Error en la consulta',
					'No existe ningún usuario',
					404
				);

			res.status(200).send({
				success: true,
				message: 'Usuarios',
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
				//captura de error, por si cambiase la ruta, con la ruta actual, no es problema si no se envía un id, pues entra a la ruta de "getAll"
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			const user = await User.findByPk(id, {
				attributes: { exclude: ['password', 'salt'] },
			});
			if (!user)
				throw new CustomError(
					'Error en la consulta',
					`No existe ningún usuario con el id: ${id}`,
					404
				);
			res.status(200).send({
				success: true,
				message: 'Usuario',
				results: user,
			});
		} catch (err) {
			next(err);
		}
	}

	static async createUser(req, res, next) {
		try {
			const { userName, firstName, lastName, email, password } = req.body;
			if (!userName || !firstName || !lastName || !email || !password)
				throw new CustomError(
					'Entrada no válida',
					'Hay campos necesarios que están vacíos',
					400
				);

			const user = await User.create({
				userName,
				firstName,
				lastName,
				email,
				password,
			});

			if (!user)
				throw new CustomError(
					'Error en el servidor',
					'Algo salió mal, no se pudo crear el usuario',
					500
				);
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
			const { userName, firstName, lastName, email } = req.body;
			if (!id) {
				throw new CustomError('Entrada no válida', 'Id no especificado', 400);
			}
			if (!userName || !firstName || !lastName || !email) {
				throw new CustomError(
					'Entrada no válida',
					'Hay campos necesarios que están vacíos',
					400
				);
			}
			const user = await User.update(
				{
					userName,
					firstName,
					lastName,
					email,
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
					404
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
