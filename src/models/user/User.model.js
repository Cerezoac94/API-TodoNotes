import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class User extends Model {}

User.init(
	{
		userName: {
			type: Dt.STRING(120),
			allowNull: false,
			unique: true,
		},
		firstName: {
			type: Dt.STRING(100),
			allowNull: false,
		},
		lastName: {
			type: Dt.STRING(100),
			allowNull: false,
		},
		email: {
			type: Dt.STRING(120),
			allowNull: false,
			unique: true,
		},
		password: {
			type: Dt.TEXT,
			allowNull: false,
		},
		salt: {
			type: Dt.STRING,
		},
	},
	{
		sequelize: conn,
		modelName: 'User',
		timestamps: false,
	}
);

export default User;
