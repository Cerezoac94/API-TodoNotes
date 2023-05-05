import { DataTypes as Dt, Model } from 'sequelize';
import conn from '../../db/db.js';

class Role extends Model {}

Role.init(
	{
		name: {
			type: Dt.STRING(50),
			allowNull: false,
		},
		description: {
			type: Dt.STRING(100),
		},
	},
	{
		sequelize: conn,
		modelName: 'Role',
		timestamps: false,
	}
);

export default Role;
