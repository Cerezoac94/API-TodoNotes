import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class User extends Model {}

User.init(
	{
		firstName: {
			type: Dt.STRING(30),
			allowNull: false,
		},
		lastName: {
			type: Dt.STRING(30),
			allowNull: false,
		},
		email: {
			type: Dt.STRING,
		},
		phone: {
			type: Dt.STRING(15),
		},
		intitutionalId: {
			type: Dt.STRING(100),
		},
		password: {
			type: Dt.TEXT,
			allowNull: false,
		},
		salt: {
			type: Dt.STRING,
		},
		idRole: {
			type: Dt.INTEGER,
		},
	},
	{
		sequelize: conn,
		modelName: 'User',
		timestamps: false,
	}
);

export default User;
